import { useEffect } from 'react';
import TimetableGenerator from '@/components/TimetableGenerator';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'College Timetable Generator';
  }, []);

  return (
    <div>
      <TimetableGenerator />
    </div>
  );
}

export default App;