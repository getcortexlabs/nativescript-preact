import { h, type ComponentChildren, type FunctionComponent } from 'preact';
import { useCallback } from 'preact/hooks';
import type { Button as NativeButton, Label as NativeLabel, Page as NativePage, StackLayout as NativeStackLayout, View, EventData } from '@nativescript/core';
import type { NativeElement } from './dom.js';

export interface ViewProps<T extends View = View> {
  id?: string;
  className?: string;
  accessibilityLabel?: string;
  isEnabled?: boolean;
  visibility?: 'visible' | 'hidden' | 'collapse';
  horizontalAlignment?: 'left' | 'center' | 'right' | 'stretch';
  verticalAlignment?: 'top' | 'middle' | 'bottom' | 'stretch';
  nativeRef?: (view: T | null) => void;
  onLoaded?: (event: EventData) => void;
  onUnloaded?: (event: EventData) => void;
  onLayoutChanged?: (event: EventData) => void;
}

export interface PageProps extends ViewProps<NativePage> {
  actionBarHidden?: boolean;
  children?: ComponentChildren;
}

export interface StackLayoutProps extends ViewProps<NativeStackLayout> {
  orientation?: 'vertical' | 'horizontal';
  children?: ComponentChildren;
}

export interface LabelProps extends ViewProps<NativeLabel> {
  text?: string | number;
  textWrap?: boolean;
  children?: ComponentChildren;
}

export interface ButtonProps extends ViewProps<NativeButton> {
  text?: string | number;
  onTap?: (event: EventData) => void;
  children?: ComponentChildren;
}

function component<T extends View, Props extends ViewProps<T>>(tag: string): FunctionComponent<Props> {
  return function NativeComponent(props: Props) {
    const { nativeRef, ...attributes } = props;
    const ref = useCallback((node: NativeElement<T> | null) => {
      nativeRef?.(node?.nativeView ?? null);
    }, [nativeRef]);
    return h(tag, { ...attributes, ref: nativeRef ? ref : undefined });
  };
}

export const Page = component<NativePage, PageProps>('page');
export const StackLayout = component<NativeStackLayout, StackLayoutProps>('stackLayout');
export const Label = component<NativeLabel, LabelProps>('label');
export const Button = component<NativeButton, ButtonProps>('button');
