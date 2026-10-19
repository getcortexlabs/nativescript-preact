import type { NativeHost } from './host.js';

const htmlNamespace = 'http://www.w3.org/1999/xhtml';
const properties = ['id', 'className', 'accessibilityLabel', 'isEnabled', 'visibility',
  'horizontalAlignment', 'verticalAlignment', 'text', 'textWrap', 'actionBarHidden', 'orientation'];
const booleanProperties = new Set(['isEnabled', 'textWrap', 'actionBarHidden']);
type Listener<View extends object> = (this: NativeElement<View>, event: unknown) => void;

export abstract class NativeNode<View extends object> {
  parentNode: NativeElement<View> | null = null;
  abstract readonly nodeType: number;
  abstract readonly nativeView: View | null;

  constructor(readonly ownerDocument: NativeDocument<View>) {}

  remove(): void {
    this.parentNode?.removeChild(this);
  }

  get nextSibling(): NativeNode<View> | null {
    const siblings = this.parentNode?.childNodes;
    return siblings?.[siblings.indexOf(this) + 1] ?? null;
  }
}

export class NativeText<View extends object> extends NativeNode<View> {
  readonly nodeType = 3;
  readonly nativeView = null;
  private value: string;

  constructor(document: NativeDocument<View>, value: unknown) {
    super(document);
    this.value = String(value);
  }

  get data(): string { return this.value; }
  set data(value: unknown) {
    this.value = String(value);
    this.parentNode?.updateText();
  }
}

export class NativeElement<View extends object> extends NativeNode<View> {
  readonly nodeType = 1;
  readonly namespaceURI = htmlNamespace;
  readonly childNodes: NativeNode<View>[] = [];
  private readonly values = new Map<string, unknown>();
  private readonly defaults = new Map<string, unknown>();
  private readonly listeners = new Map<string, Map<Listener<View>, () => void>>();

  constructor(
    document: NativeDocument<View>,
    readonly localName: string,
    readonly nativeView: View | null,
  ) {
    super(document);
    if (nativeView) {
      // Property descriptors keep false values out of Preact's HTML attribute path.
      for (const name of properties) {
        Object.defineProperty(this, name, {
          get: () => document.host.getProperty(nativeView, name),
          set: value => {
            if (value === '' && booleanProperties.has(name)) this.removeAttribute(name);
            else this.setAttribute(name, value);
          },
        });
      }
    }
  }

  get firstChild(): NativeNode<View> | null { return this.childNodes[0] ?? null; }
  get attributes() { return Array.from(this.values, ([name, value]) => ({ name, value })); }

  // Preact's HTML escape hatch is intentionally unavailable on a native view.
  set innerHTML(_value: unknown) {
    throw new Error('NativeScript Preact does not render HTML. Use native components.');
  }

  get style(): never {
    throw new Error('Inline styles are not supported in this prototype. Use className and NativeScript CSS.');
  }

  appendChild(child: NativeNode<View>): NativeNode<View> {
    return this.insertBefore(child, null);
  }

  insertBefore(child: NativeNode<View>, anchor: NativeNode<View> | null): NativeNode<View> {
    if (child === anchor) return child;
    if (anchor && anchor.parentNode !== this) throw new Error('Insertion anchor is not a child of this node.');
    for (let parent: NativeNode<View> | null = this; parent; parent = parent.parentNode) {
      if (parent === child) throw new Error('A node cannot contain itself.');
    }
    if (child.ownerDocument !== this.ownerDocument) throw new Error('Cannot move nodes between native roots.');
    if (child instanceof NativeText && !['label', 'button'].includes(this.localName)) {
      throw new Error('Text children must be inside Label or Button.');
    }

    // Moving a keyed child must preserve its native view and event subscriptions.
    child.parentNode?.detachChild(child, false);
    const index = anchor ? this.childNodes.indexOf(anchor) : this.childNodes.length;
    this.childNodes.splice(index, 0, child);
    child.parentNode = this;

    if (this.nativeView && child.nativeView) {
      const nativeIndex = this.childNodes.slice(0, index).filter(node => node.nativeView).length;
      this.ownerDocument.host.insertChild(this.nativeView, child.nativeView, nativeIndex);
    } else if (child instanceof NativeText) {
      this.updateText();
    }
    return child;
  }

  removeChild(child: NativeNode<View>): NativeNode<View> {
    this.detachChild(child, true);
    return child;
  }

  private detachChild(child: NativeNode<View>, dispose: boolean): void {
    const index = this.childNodes.indexOf(child);
    if (index < 0) throw new Error('Cannot remove a node from a different parent.');
    this.childNodes.splice(index, 1);
    child.parentNode = null;
    if (this.nativeView && child.nativeView) {
      this.ownerDocument.host.removeChild(this.nativeView, child.nativeView);
    } else if (child instanceof NativeText) {
      this.updateText();
    }
    if (dispose && child instanceof NativeElement) child.disposeListeners();
  }

  private disposeListeners(): void {
    for (const listeners of this.listeners.values()) {
      for (const stop of listeners.values()) stop();
    }
    this.listeners.clear();
    for (const child of this.childNodes) {
      if (child instanceof NativeElement) child.disposeListeners();
    }
  }

  updateText(): void {
    if (!this.nativeView) return;
    const text = this.childNodes.filter(node => node instanceof NativeText).map(node => node.data).join('');
    this.ownerDocument.host.setProperty(this.nativeView, 'text', text);
  }

  setAttribute(name: string, value: unknown): void {
    if (!this.nativeView) throw new Error('The rendering root does not accept properties.');
    if (!this.defaults.has(name)) {
      this.defaults.set(name, this.ownerDocument.host.getProperty(this.nativeView, name));
    }
    this.values.set(name, value);
    this.ownerDocument.host.setProperty(this.nativeView, name, value);
  }

  removeAttribute(name: string): void {
    if (!this.nativeView || !this.defaults.has(name)) return;
    this.values.delete(name);
    this.ownerDocument.host.setProperty(this.nativeView, name, this.defaults.get(name));
  }

  addEventListener(name: string, listener: Listener<View>, capture = false): void {
    if (capture) throw new Error('DOM event capture is not supported by native views.');
    if (!this.nativeView) throw new Error('The rendering root does not accept events.');
    let listeners = this.listeners.get(name);
    if (!listeners) this.listeners.set(name, listeners = new Map());
    if (listeners.has(listener)) return;
    const stop = this.ownerDocument.host.listen(this.nativeView, name, event => listener.call(this, event));
    listeners.set(listener, stop);
  }

  removeEventListener(name: string, listener: Listener<View>): void {
    const listeners = this.listeners.get(name);
    listeners?.get(listener)?.();
    listeners?.delete(listener);
  }
}

export class NativeDocument<View extends object> {
  constructor(readonly host: NativeHost<View>) {}

  createElementNS(namespace: string, tag: string): NativeElement<View> {
    if (namespace !== htmlNamespace) throw new Error('SVG and MathML are not supported by the native renderer.');
    return new NativeElement(this, tag, this.host.createView(tag));
  }

  createTextNode(value: unknown): NativeText<View> {
    return new NativeText(this, value);
  }
}
