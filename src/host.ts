export interface NativeHost<View extends object> {
  createView(tag: string): View;
  insertChild(parent: View, child: View, index: number): void;
  removeChild(parent: View, child: View): void;
  getProperty(view: View, name: string): unknown;
  setProperty(view: View, name: string, value: unknown): void;
  listen(view: View, name: string, callback: (event: unknown) => void): () => void;
}
