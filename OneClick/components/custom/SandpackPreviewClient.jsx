import React, { useContext, useEffect, useRef } from 'react';
import {
  SandpackPreviewRef,
  useSandpack,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import { ActionContext } from '@/context/ActionContext';

const SandpackPreviewClient = () => {
  const { sandpack } = useSandpack();
  const previewRef = useRef();
  const { action, setAction } = useContext(ActionContext);

  useEffect(() => {
    GetSandPackClient();
  }, [sandpack && action]);

  const GetSandPackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log(client);
      const result = await client.getCodeSandboxURL();
      console.log(result);
      if (action?.actionType === 'deploy') {
        window.open('https://' + result?.sandboxId + '.csb.app');
      } else if (action?.actionType === 'export') {
        window.open(`${result.editorUrl}`);
      }
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
