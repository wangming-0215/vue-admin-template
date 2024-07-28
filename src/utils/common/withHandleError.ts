import getErrorMessage from './getErrorMessage';

interface WithHandleErrorOptions {
  showErrorMessage?: boolean;
  rethrow?: boolean;
  onCatch?: (error: any) => void;
  onFinally?: () => void;
}

export default function withHandleError<T, A extends any[]>(fn: (...args: A) => Promise<T>, options?: WithHandleErrorOptions) {
  const {
    showErrorMessage: showErrorMessageProp = true,
    rethrow = false,
    onCatch,
    onFinally,
  } = options || {};

  function showErrorMessage(error: any) {
    const message = getErrorMessage(error);
    window.$message?.error(message);
  }

  return async (...args: A): Promise<T | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (showErrorMessageProp) {
        showErrorMessage(error);
      }
      onCatch?.(error);
      if (rethrow) {
        throw error;
      }
    } finally {
      onFinally?.();
    }
  };
}
