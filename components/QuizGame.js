import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuizGame = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://1c83-171-225-184-205.ngrok-free.app/question/allquestion');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      console.log('Quiz data:', data); // Debug log
      setQuestions(data);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Unable to load questions. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    console.log('Selected answer:', selectedAnswer);
    console.log('Current question:', questions[currentQuestion]);
    console.log('Correct answer from backend:', questions[currentQuestion].answer);
    
    // Convert both values to numbers for comparison
    const selectedValue = Number(selectedAnswer);
    const correctValue = Number(questions[currentQuestion].answer);
    
    const isCorrect = selectedValue === correctValue;
    
    if (isCorrect) {
      setScore(score + 1);
      Alert.alert(
        'Correct! 🎉',
        'You answered correctly!',
        [{ 
          text: 'Continue',
          onPress: () => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
              setCurrentQuestion(nextQuestion);
            } else {
              setShowScore(true);
            }
          }
        }]
      );
    } else {
      Alert.alert(
        'Incorrect! 😢',
        `The correct answer is: ${getAnswerLabel(correctValue)}`,
        [{ 
          text: 'Continue',
          onPress: () => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
              setCurrentQuestion(nextQuestion);
            } else {
              setShowScore(true);
            }
          }
        }]
      );
    }
  };

  const getAnswerLabel = (answerValue) => {
    const answerMap = {
      1: 'Inorganic waste',
      2: 'Organic waste',
      3: 'Recyclable waste'
    };
    return answerMap[answerValue] || 'Unknown';
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Waste Sorting Game</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#16a34a" />
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Waste Sorting Game</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchQuestions}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showScore) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Results</Text>
        </View>
        <View style={styles.scoreContainer}>
          <MaterialCommunityIcons name="trophy" size={100} color="#FFD700" />
          <Text style={styles.scoreTitle}>Congratulations! 🎉</Text>
          <Text style={styles.scoreText}>
            You got {score} out of {questions.length} questions correct!
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Check if we have valid questions data
  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Waste Sorting Game</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No questions available. Please try again!</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchQuestions}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQ = questions[currentQuestion];
  if (!currentQ) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Waste Sorting Game</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error displaying question. Please try again!</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={restartQuiz}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Waste Sorting Game</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1}/{questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQ.question}
          </Text>
          
          {currentQ.image && (
            <Image 
              source={{ uri: `data:image/jpeg;base64,${currentQ.image}` }}
              style={styles.questionImage}
              resizeMode="contain"
            />
          )}

          <View style={styles.answersContainer}>
            {[
              { value: 1, label: 'Inorganic waste' },
              { value: 2, label: 'Organic waste' },
              { value: 3, label: 'Recyclable waste' }
            ].map((answer) => (
              <TouchableOpacity
                key={answer.value}
                style={styles.answerButton}
                onPress={() => handleAnswer(answer.value)}
              >
                <Text style={styles.answerText}>{answer.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2ecc71',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 5,
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  answersContainer: {
    gap: 10,
  },
  answerButton: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default QuizGame; 