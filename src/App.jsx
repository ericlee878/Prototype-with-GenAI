import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import the Modal component

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(180); // 120 seconds = 2 minutes
  const [showWarning, setShowWarning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [queue, setQueue] = useState(['User 1', 'User 2', 'User 3']); // Example queue
  const [customTime, setCustomTime] = useState({ minutes: 2, seconds: 0 });
  const [customTimeInput, setCustomTimeInput] = useState({ minutes: 2, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (timeLeft === 120) {
      setShowWarning(true);
    } else if (timeLeft === 0) {
      // Trigger alarm when time is up
      // Implement alarm functionality here
    }
  }, [timeLeft]);

  useEffect(() => {
    if (showWarning) {
      setIsModalOpen(true); // Open modal when showWarning is true
    }
  }, [showWarning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleTogglePause = () => {
    setIsPaused(prevPaused => !prevPaused);
  };

  const moveUserUp = index => {
    if (index > 0) {
      const newQueue = [...queue];
      [newQueue[index - 1], newQueue[index]] = [newQueue[index], newQueue[index - 1]];
      setQueue(newQueue);
    }
  };

  const moveUserDown = index => {
    if (index < queue.length - 1) {
      const newQueue = [...queue];
      [newQueue[index], newQueue[index + 1]] = [newQueue[index + 1], newQueue[index]];
      setQueue(newQueue);
    }
  };

  const handleCustomTimeChange = e => {
    const { name, value } = e.target;
    setCustomTimeInput(prevInput => ({
      ...prevInput,
      [name]: parseInt(value, 10)
    }));
  };

  const handleApplyCustomTime = () => {
    setTimeLeft(customTimeInput.minutes * 60 + customTimeInput.seconds);
    setCustomTime(customTimeInput);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowWarning(false); // Reset showWarning after closing modal
  };

  const handleConfirmModal = () => {
    // Define the action to be taken when the user confirms
    setIsModalOpen(false);
    // Perform any additional actions here
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} handleClose={handleCloseModal} handleConfirm={handleConfirmModal} /> {/* Render the modal */}
      <h2>Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
      <button onClick={handleTogglePause}>{isPaused ? 'Start' : 'Pause'}</button>
      <div>
        <h3>Queue:</h3>
        <ul>
          {queue.map((user, index) => (
            <li key={index}>
              {user}
              <button onClick={() => moveUserUp(index)}>Move Up</button>
              <button onClick={() => moveUserDown(index)}>Move Down</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Set Time:</h3>
        <input
          type="number"
          name="minutes"
          value={customTimeInput.minutes}
          onChange={handleCustomTimeChange}
        />
        <span> : </span>
        <input
          type="number"
          name="seconds"
          value={customTimeInput.seconds}
          onChange={handleCustomTimeChange}
        />
        <button onClick={handleApplyCustomTime}>Apply</button>
      </div>
    </div>
  );
};

export default Timer;
