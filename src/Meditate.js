import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

const meditationPhases = [
  { name: 'Deep Breaths', duration: 4 }, // duration in seconds
  { name: 'Shallow Breaths', duration: 2 }, // duration in seconds
  { name: 'Rest', duration: 3 }, // duration in seconds
];

const Meditate = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(meditationPhases[currentPhase]?.duration || 0);
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time

  useEffect(() => {
    let timer;
    if (isPlaying) {
      // Update the elapsed time every 10ms
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 0.01); // Increment by 10 ms
      }, 10); // Update every 10 ms
    }

    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    const currentDuration = meditationPhases[currentPhase]?.duration;

    if (elapsedTime >= currentDuration) {
      handleNextPhase();
    } else {
      // Calculate time left more frequently
      setTimeLeft(currentDuration - Math.floor(elapsedTime));
    }
  }, [elapsedTime, currentPhase]);

  const handleNextPhase = () => {
    if (currentPhase < meditationPhases.length - 1) {
      setCurrentPhase((prevPhase) => prevPhase + 1);
      setElapsedTime(0); // Reset elapsed time
      setTimeLeft(meditationPhases[currentPhase + 1].duration);
    } else {
      Alert.alert('Meditation Completed', 'Great job on finishing your meditation session!');
      resetMeditation();
    }
  };

  const resetMeditation = () => {
    setIsPlaying(false);
    setCurrentPhase(0);
    setElapsedTime(0); // Reset elapsed time
    setTimeLeft(meditationPhases[0]?.duration || 0);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meditationPhases[currentPhase]?.name}</Text>
      <CircularProgress
        size={200}
        width={15}
        fill={((elapsedTime) / meditationPhases[currentPhase]?.duration) * 100} // Fill calculation based on elapsed time
        rotation={-90}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
      />
      <Text style={styles.timerText}>{timeLeft}s</Text>
      <View style={styles.buttonContainer}>
        <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
        <Button title="Reset" onPress={resetMeditation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default Meditate;
