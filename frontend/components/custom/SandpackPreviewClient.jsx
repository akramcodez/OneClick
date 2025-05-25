import React, { useEffect, useRef } from 'react';
import {
  SandpackPreviewRef,
  useSandpack,
  SandpackPreview,
} from '@codesandbox/sandpack-react';

const SandpackPreviewClient = () => {
  const { sandpack } = useSandpack();
  const previewRef = useRef();

  useEffect(() => {
    GetSandPackClient();
  }, [sandpack]);

  const GetSandPackClient = () => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log(client);
    }
  };

  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: '78vh', width: '100%' }}
      showNavigator={true}
    />
  );
};

export default SandpackPreviewClient;
