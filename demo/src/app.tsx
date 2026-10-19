import { useState } from 'preact/hooks';
import { Button, Label, Page, run, StackLayout } from 'nativescript-preact';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <StackLayout className="counter-card">
      <Label className="eyebrow" text="YOUR FIRST NATIVE COUNTER" />
      <Label id="count" className="count" accessibilityLabel={`Count: ${count}`}>{count}</Label>
      <Label className="counter-hint" text="Preact state. Native views." />
      <Button
        id="increment"
        className="primary-button"
        text="Add one"
        accessibilityLabel="Add one"
        onTap={() => setCount(value => value + 1)}
      />
      <Button
        id="reset"
        className="reset-button"
        text="Reset counter"
        accessibilityLabel="Reset counter"
        onTap={() => setCount(0)}
      />
    </StackLayout>
  );
}

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <Page actionBarHidden className="page">
      <StackLayout className="screen" verticalAlignment="middle">
        <Label className="brand" text="NATIVESCRIPT + PREACT" />
        <Label className="title" text="Hello, native." />
        <Label className="subtitle" text="A small beginning. Real native UI." textWrap />
        {visible ? <Counter /> : <Label id="unmounted" className="empty-state" text="Counter unmounted." />}
        <Button
          id="toggle"
          className="toggle-button"
          text={visible ? 'Unmount counter' : 'Mount counter'}
          onTap={() => setVisible(value => !value)}
        />
        <Label className="footer" text="Experimental prototype · No WebView" />
      </StackLayout>
    </Page>
  );
}

run(<App />);
