import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import generateMeditation from "./generateMeditation";

const defaultMeditationPhases = [
    { name: 'Deep Breaths', duration: 4 }, // duration in seconds
    { name: 'Shallow Breaths', duration: 2 }, // duration in seconds
    { name: 'Rest', duration: 3 }, // duration in seconds
  ];
const Meditate = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);

  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time

  const [meditationPhases, setMeditationPhases] = useState(defaultMeditationPhases); // Store meditation phases
  const [timeLeft, setTimeLeft] = useState(meditationPhases[currentPhase]?.duration || 0);

  // Fetch meditation phases asynchronously when the component mounts
  useEffect(() => {
    console.log("Fetching meditation phases");
    const fetchMeditationPhases = async () => {
      try {
        const phases = await generateMeditation('stressed'); // Assuming generateMeditation is async
        console.log(phases);
        setMeditationPhases(phases); 
      } catch (error) {
        console.error("Error fetching meditation phases:", error);
      }
    };

    fetchMeditationPhases();
  }, []); // Only run this once when the component mounts

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
        size={250}
        width={20}
        fill={((elapsedTime) / meditationPhases[currentPhase]?.duration) * 100} // Fill calculation based on elapsed time
        rotation={-90}
        tintColor="#a7c5a3"
        backgroundColor="lightgray"
        lineCap="round"

      />
      <Text style={styles.timerText}>{timeLeft}s</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetMeditation}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8efdd',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#374d36',
    marginBottom: 50,
    textAlign: 'center',
  },
  
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#94b9bf',
    marginVertical: 30,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40,
  },

  playPauseButton: {
    backgroundColor: '#94b9bf',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },

  resetButton: {
    backgroundColor: '#a7c5a3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',    // Center the buttons horizontally in the container
    alignItems: 'center',        // Align buttons vertically in the container
  },

  buttonText: {
    color: '#374d36',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Meditate;