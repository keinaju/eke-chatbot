import { useEffect, useState } from 'react';
import { Button } from './components/ui/button.tsx';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <>
      <p className="font-bold">Message: {message}</p>
      <Button>Click</Button>
    </>
  );
}

export default App;
