import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { courseApi } from '../services/courseApi';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  IoPlayCircleOutline,
  IoCheckmarkCircle,
  IoCheckmarkCircleOutline,
  IoArrowBackOutline,
  IoRibbonOutline,
  IoHelpCircleOutline,
  IoPrintOutline,
  IoDownloadOutline,
  IoBookOutline,
  IoShieldCheckmarkOutline,
  IoChatbubblesOutline,
  IoCreateOutline,
} from 'react-icons/io5';

function LessonPlayer() {
  const { id } = useParams();
  const { user } = useAuth();
  const { enrolledCourses } = useCourses();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('video'); // 'video', 'quiz', 'certificate'

  // Quiz state
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Q&A Discussion state
  const [questionsList, setQuestionsList] = useState([
    {
      id: 'q1',
      author: 'David Chen',
      question: 'How do we handle state persistence across browser refreshes for this module?',
      answer: 'Great question! You can utilize localStorage or indexedDB hooks as demonstrated in Lesson 3.',
      date: '1 day ago',
    },
    {
      id: 'q2',
      author: 'Elena Rostova',
      question: 'Is there a recommended style guide or code convention for React components in this course?',
      answer: 'Yes, we recommend Airbnb JavaScript style guidelines with functional components and React Hooks.',
      date: '3 days ago',
    },
  ]);
  // Personal Notes state
  const [notesText, setNotesText] = useState(() => {
    return localStorage.getItem(`eduweb_notes_${id}`) || '• Remember to review state hooks and component lifecycle methods.\n• Practice building re-usable custom hooks.';
  });
  const [notesSavedMsg, setNotesSavedMsg] = useState('');

  const handleSaveNotes = () => {
    localStorage.setItem(`eduweb_notes_${id}`, notesText);
    setNotesSavedMsg('Notes saved to local notebook!');
    setTimeout(() => setNotesSavedMsg(''), 2000);
  };

  const handleDownloadNotes = () => {
    const element = document.createElement('a');
    const file = new Blob([`EduWeb Notes for ${course?.title || 'Course'}\n\n${notesText}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${course?.title || 'Course'}_Notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const data = await courseApi.getCourseById(id);
        setCourse(data);
        // Load completed lessons from localStorage
        const savedProgress = localStorage.getItem(`eduweb_progress_${id}`);
        if (savedProgress) {
          setCompletedLessons(JSON.parse(savedProgress));
        }
      } catch (err) {
        console.error('Failed to load course for player', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const toggleLessonComplete = (idx) => {
    setCompletedLessons((prev) => {
      let updated;
      if (prev.includes(idx)) {
        updated = prev.filter((i) => i !== idx);
      } else {
        updated = [...prev, idx];
      }
      localStorage.setItem(`eduweb_progress_${id}`, JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) return <LoadingSpinner fullPage />;

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center p-6">
        <h2 className="font-spartan text-3xl font-bold">Course Not Found</h2>
        <Link to="/courses" className="btn has-before mt-4">
          Back to Courses
        </Link>
      </div>
    );
  }

  const totalLessons = course.lessonsList.length;
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);
  const isCourseComplete = progressPercent === 100 || quizScore >= 80;

  // Mock quiz questions
  const sampleQuiz = [
    {
      id: 1,
      question: `What is the core objective of ${course.title}?`,
      options: [
        `Mastering fundamental and advanced concepts of ${course.level}`,
        'Memorizing code without understanding logic',
        'Creating unstyled HTML forms only',
        'Skipping best practices in software design',
      ],
      correct: 0,
    },
    {
      id: 2,
      question: 'Which tool or practice is essential for web development?',
      options: [
        'Version control and structured components',
        'Manual file renaming only',
        'Disabling developer options',
        'Ignoring accessibility guidelines',
      ],
      correct: 0,
    },
    {
      id: 3,
      question: 'How do responsive design principles benefit users?',
      options: [
        'Ensures UI adapts seamlessly across desktop, tablet, and mobile screens',
        'Forces single desktop layout on mobile devices',
        'Increases page loading times',
        'Removes all CSS styles',
      ],
      correct: 0,
    },
  ];

  const handleSelectAnswer = (qId, optionIdx) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let correctCount = 0;
    sampleQuiz.forEach((q) => {
      if (userAnswers[q.id] === q.correct) {
        correctCount += 1;
      }
    });
    const score = Math.round((correctCount / sampleQuiz.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 80) {
      // Mark all lessons completed
      const allIndexes = course.lessonsList.map((_, i) => i);
      setCompletedLessons(allIndexes);
      localStorage.setItem(`eduweb_progress_${id}`, JSON.stringify(allIndexes));
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="lesson-player bg-slate-100 dark:bg-slate-950 min-h-screen py-6">
      <div className="container max-w-[1300px]">
        {/* Header Bar */}
        <div className="flex flex-wrap justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-[10px] shadow-sm mb-6 border border-platinum/60 dark:border-slate-800 text-left">
          <div className="flex items-center gap-3">
            <Link
              to="/my-courses"
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-eerie-black-1 dark:text-white hover:text-kappel transition-colors"
            >
              <IoArrowBackOutline className="text-xl" />
            </Link>
            <div>
              <span className="text-[1.2rem] font-spartan text-kappel font-bold uppercase tracking-wider">
                {course.level}
              </span>
              <h1 className="font-spartan text-[1.8rem] md:text-[2.2rem] font-bold text-eerie-black-1 dark:text-white leading-tight">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            {/* Progress Badge */}
            <div className="flex items-center gap-2 bg-kappel-15 px-4 py-2 rounded-[20px]">
              <div className="w-8 h-8 rounded-full bg-kappel text-white text-[1.2rem] font-bold flex items-center justify-center font-spartan">
                {progressPercent}%
              </div>
              <span className="font-spartan text-[1.4rem] font-bold text-kappel">
                {progressPercent === 100 ? 'Completed!' : 'In Progress'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Left Column: Player & Tab Content */}
          <div className="flex flex-col gap-6 text-left">
            {/* Tabs */}
            <div className="flex border-b border-platinum/60 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-t-[10px] px-6 pt-4 gap-6">
              <button
                onClick={() => setActiveTab('video')}
                className={`pb-3 font-spartan text-[1.6rem] font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'video'
                    ? 'border-kappel text-kappel'
                    : 'border-transparent text-gray-web dark:text-slate-400 hover:text-eerie-black-1'
                }`}
              >
                <IoPlayCircleOutline className="text-xl" />
                <span>Lesson View</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`pb-3 font-spartan text-[1.6rem] font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'quiz'
                    ? 'border-kappel text-kappel'
                    : 'border-transparent text-gray-web dark:text-slate-400 hover:text-eerie-black-1'
                }`}
              >
                <IoHelpCircleOutline className="text-xl" />
                <span>Interactive Quiz</span>
              </button>

              <button
                onClick={() => setActiveTab('certificate')}
                className={`pb-3 font-spartan text-[1.6rem] font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'certificate'
                    ? 'border-kappel text-kappel'
                    : 'border-transparent text-gray-web dark:text-slate-400 hover:text-eerie-black-1'
                }`}
              >
                <IoRibbonOutline className="text-xl" />
                <span>Course Certificate</span>
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`pb-3 font-spartan text-[1.6rem] font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'discussion'
                    ? 'border-kappel text-kappel'
                    : 'border-transparent text-gray-web dark:text-slate-400 hover:text-eerie-black-1'
                }`}
              >
                <IoChatbubblesOutline className="text-xl" />
                <span>Community Q&A</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 font-spartan text-[1.6rem] font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'notes'
                    ? 'border-kappel text-kappel'
                    : 'border-transparent text-gray-web dark:text-slate-400 hover:text-eerie-black-1'
                }`}
              >
                <IoCreateOutline className="text-xl" />
                <span>My Notes</span>
              </button>
            </div>

            {/* Tab 1: Video Player & Overview */}
            {activeTab === 'video' && (
              <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-b-[10px] p-6 shadow-sm">
                {/* Simulated Screen Player */}
                <div className="aspect-[16/9] bg-slate-950 rounded-[10px] overflow-hidden relative flex flex-col justify-center items-center text-white shadow-inner mb-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <div className="relative z-10 text-center p-6 bg-slate-900/80 backdrop-blur-sm rounded-[12px] max-w-[500px] border border-slate-700">
                    <IoPlayCircleOutline className="text-6xl text-kappel mx-auto mb-3 animate-pulse" />
                    <span className="text-[1.3rem] text-kappel uppercase font-spartan font-bold tracking-widest block mb-1">
                      Lesson {activeLessonIdx + 1} of {totalLessons}
                    </span>
                    <h3 className="font-spartan text-[2.2rem] font-bold mb-2">
                      {course.lessonsList[activeLessonIdx]}
                    </h3>
                    <p className="text-[1.4rem] text-slate-300 font-sans">
                      Interactive video tutorial session covering key modules and best practice code patterns.
                    </p>
                  </div>
                </div>

                {/* Lesson Info Controls */}
                <div className="flex flex-wrap justify-between items-center pb-4 border-b border-platinum/40 dark:border-slate-800 mb-6 gap-4">
                  <div>
                    <h2 className="font-spartan text-[2.2rem] font-bold text-eerie-black-1 dark:text-white">
                      {course.lessonsList[activeLessonIdx]}
                    </h2>
                    <p className="text-[1.4rem] text-gray-web dark:text-slate-400 mt-1">
                      Module {activeLessonIdx + 1} • {course.duration} total duration
                    </p>
                  </div>

                  <button
                    onClick={() => toggleLessonComplete(activeLessonIdx)}
                    className={`px-5 py-2.5 rounded-[6px] font-spartan font-bold text-[1.4rem] flex items-center gap-2 transition-all ${
                      completedLessons.includes(activeLessonIdx)
                        ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-300'
                        : 'bg-kappel text-white hover:bg-eerie-black-1'
                    }`}
                  >
                    {completedLessons.includes(activeLessonIdx) ? (
                      <>
                        <IoCheckmarkCircle className="text-xl" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <IoCheckmarkCircleOutline className="text-xl" />
                        <span>Mark Complete</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-spartan text-[1.8rem] font-bold text-eerie-black-1 dark:text-white mb-2">
                    About this lesson
                  </h4>
                  <p className="text-[1.5rem] text-gray-web dark:text-slate-300 leading-relaxed font-sans">
                    In this session, you will learn hands-on methods for {course.lessonsList[activeLessonIdx]}. Follow along with the instructor step-by-step to master the techniques.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Quiz */}
            {activeTab === 'quiz' && (
              <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-b-[10px] p-6 shadow-sm">
                <div className="mb-6 border-b border-platinum/40 dark:border-slate-800 pb-4">
                  <h3 className="font-spartan text-[2.2rem] font-bold text-eerie-black-1 dark:text-white">
                    Course Knowledge Assessment
                  </h3>
                  <p className="text-[1.4rem] text-gray-web dark:text-slate-400 mt-1">
                    Pass this 3-question quiz with 80% or higher to earn your verified certificate!
                  </p>
                </div>

                {quizSubmitted ? (
                  <div className="text-center py-8">
                    <div
                      className={`w-[80px] h-[80px] rounded-full flex items-center justify-center mx-auto mb-4 text-4xl font-bold ${
                        quizScore >= 80 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {quizScore}%
                    </div>
                    <h4 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 dark:text-white mb-2">
                      {quizScore >= 80 ? 'Quiz Passed 🎉' : 'Needs Improvement'}
                    </h4>
                    <p className="text-[1.5rem] text-gray-web dark:text-slate-300 mb-6 max-w-[450px] mx-auto">
                      {quizScore >= 80
                        ? 'Great job! You passed the assessment and unlocked your Course Certificate.'
                        : 'Review the lessons and try taking the quiz again.'}
                    </p>
                    <div className="flex justify-center gap-4">
                      {quizScore >= 80 ? (
                        <button
                          onClick={() => setActiveTab('certificate')}
                          className="btn has-before text-[1.5rem]"
                        >
                          View Certificate
                        </button>
                      ) : (
                        <button
                          onClick={() => setQuizSubmitted(false)}
                          className="btn has-before text-[1.5rem]"
                        >
                          Retake Quiz
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuizSubmit} className="space-y-6">
                    {sampleQuiz.map((q, qIdx) => (
                      <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-[8px]">
                        <h4 className="font-spartan text-[1.6rem] font-bold text-eerie-black-1 dark:text-white mb-3">
                          {qIdx + 1}. {q.question}
                        </h4>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => (
                            <label
                              key={optIdx}
                              className={`flex items-center gap-3 p-3 rounded-[6px] cursor-pointer border transition-colors ${
                                userAnswers[q.id] === optIdx
                                  ? 'border-kappel bg-kappel-15 font-semibold text-kappel'
                                  : 'border-platinum/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-eerie-black-1 dark:text-slate-200'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q_${q.id}`}
                                checked={userAnswers[q.id] === optIdx}
                                onChange={() => handleSelectAnswer(q.id, optIdx)}
                                className="accent-kappel w-4 h-4"
                              />
                              <span className="text-[1.4rem]">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      disabled={Object.keys(userAnswers).length < sampleQuiz.length}
                      className="btn has-before w-full justify-center text-[1.6rem]"
                    >
                      Submit Quiz
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Tab 3: Printable Certificate Generator */}
            {activeTab === 'certificate' && (
              <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-b-[10px] p-6 shadow-sm">
                {!isCourseComplete ? (
                  <div className="text-center py-12">
                    <IoRibbonOutline className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="font-spartan text-[2.2rem] font-bold text-eerie-black-1 dark:text-white mb-2">
                      Certificate Locked
                    </h3>
                    <p className="text-[1.5rem] text-gray-web dark:text-slate-400 mb-6 max-w-[450px] mx-auto">
                      Complete all {totalLessons} lessons or pass the course quiz to unlock your official certificate of completion.
                    </p>
                    <button
                      onClick={() => setActiveTab('video')}
                      className="btn has-before text-[1.5rem] mx-auto"
                    >
                      Continue Lessons ({progressPercent}% Done)
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Printable Certificate Box */}
                    <div id="printable-certificate" className="border-[8px] border-double border-kappel bg-gradient-to-br from-amber-50/40 via-white to-teal-50/30 p-8 md:p-12 text-center rounded-[8px] shadow-lg relative my-4 text-slate-800">
                      <div className="flex justify-between items-center mb-6">
                        <span className="font-spartan font-bold text-kappel tracking-widest text-[1.4rem] uppercase">
                          EduWeb Academy
                        </span>
                        <IoShieldCheckmarkOutline className="text-4xl text-kappel" />
                      </div>

                      <span className="font-spartan text-[1.6rem] uppercase tracking-[3px] text-gray-500 font-bold block mb-2">
                        Certificate of Completion
                      </span>
                      <h2 className="font-spartan text-[2.8rem] md:text-[3.5rem] font-extrabold text-slate-900 mb-4">
                        {user ? user.name || 'Student' : 'Learner'}
                      </h2>
                      <p className="text-[1.5rem] text-slate-600 font-sans mb-4">
                        has successfully completed the online course
                      </p>
                      <h3 className="font-spartan text-[2.2rem] md:text-[2.6rem] font-bold text-kappel mb-6">
                        {course.title}
                      </h3>

                      <div className="flex flex-wrap justify-between items-end border-t border-slate-300 pt-6 mt-8 text-[1.3rem] text-slate-600">
                        <div className="text-left">
                          <p className="font-bold text-slate-900">Date Issued:</p>
                          <p>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div className="text-center">
                          <span className="font-spartan font-bold text-[1.8rem] text-slate-900 block border-b border-slate-400 pb-1 mb-1">
                            EduWeb Instructor
                          </span>
                          <span>Verified Signature</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">Credential ID:</p>
                          <p>EDU-{id}-{Math.floor(100000 + Math.random() * 900000)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                      <button
                        onClick={handlePrintCertificate}
                        className="btn has-before text-[1.6rem] flex items-center gap-2"
                      >
                        <IoPrintOutline className="text-xl" />
                        <span>Print / Save PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Community Discussion Q&A */}
            {activeTab === 'discussion' && (
              <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-b-[10px] p-6 shadow-sm">
                <div className="mb-6 border-b border-platinum/40 dark:border-slate-800 pb-4">
                  <h3 className="font-spartan text-[2.2rem] font-bold text-eerie-black-1 dark:text-white">
                    Lesson Discussion Forum
                  </h3>
                  <p className="text-[1.4rem] text-gray-web dark:text-slate-400 mt-1">
                    Ask questions about {course.lessonsList[activeLessonIdx]} or get help from the instructor and peers.
                  </p>
                </div>

                {/* Ask Question Form */}
                <form onSubmit={handleQuestionSubmit} className="mb-8">
                  <textarea
                    rows="3"
                    placeholder="Type your question or discussion point for this lesson..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    required
                    className="w-full p-3 border border-platinum/80 dark:border-slate-700 rounded-[8px] text-[1.4rem] font-sans focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white mb-3"
                  ></textarea>
                  <button type="submit" className="btn has-before text-[1.4rem] py-2 px-6">
                    Post Question
                  </button>
                </form>

                {/* Questions List */}
                <div className="space-y-4">
                  {questionsList.map((q) => (
                    <div key={q.id} className="p-4 border border-platinum/40 dark:border-slate-800 rounded-[8px] bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-spartan font-bold text-[1.5rem] text-kappel">{q.author}</span>
                        <span className="text-[1.2rem] text-gray-400">{q.date}</span>
                      </div>
                      <p className="font-spartan font-bold text-[1.6rem] text-eerie-black-1 dark:text-white mb-2">
                        Q: {q.question}
                      </p>
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-[6px] border-l-4 border-kappel text-[1.3rem] text-gray-web dark:text-slate-300 font-sans">
                        <strong className="text-kappel block mb-1">Answer / Instructor Reply:</strong>
                        {q.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Personal Lesson Notes */}
            {activeTab === 'notes' && (
              <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-b-[10px] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6 border-b border-platinum/40 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="font-spartan text-[2.2rem] font-bold text-eerie-black-1 dark:text-white">
                      Personal Notebook
                    </h3>
                    <p className="text-[1.4rem] text-gray-web dark:text-slate-400 mt-1">
                      Write, save, and export your personal study notes for {course.title}.
                    </p>
                  </div>
                  {notesSavedMsg && (
                    <span className="text-[1.3rem] text-green-600 font-bold bg-green-100 dark:bg-green-950 px-3 py-1 rounded-[4px] border border-green-300">
                      {notesSavedMsg}
                    </span>
                  )}
                </div>

                <textarea
                  rows="10"
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Type your notes here..."
                  className="w-full p-4 border border-platinum/80 dark:border-slate-700 rounded-[8px] text-[1.5rem] font-sans focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white mb-4 leading-relaxed"
                ></textarea>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleSaveNotes}
                    className="btn has-before text-[1.4rem] py-2.5 px-6"
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={handleDownloadNotes}
                    className="px-5 py-2.5 border border-platinum/80 dark:border-slate-700 rounded-[5px] text-[1.4rem] font-spartan font-bold text-eerie-black-1 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                  >
                    <IoDownloadOutline className="text-xl" />
                    <span>Download as .TXT</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Lessons Playlist Sidebar */}
          <aside className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-[10px] p-6 shadow-sm text-left">
            <h3 className="font-spartan text-[2rem] font-bold text-eerie-black-1 dark:text-white mb-4 border-b border-platinum/40 dark:border-slate-800 pb-3">
              Course Content ({totalLessons})
            </h3>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-[1.3rem] font-bold font-spartan text-eerie-black-1 dark:text-slate-300 mb-1">
                <span>Overall Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-kappel transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Lesson List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {course.lessonsList.map((lessonTitle, idx) => {
                const isCompleted = completedLessons.includes(idx);
                const isActive = activeLessonIdx === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveLessonIdx(idx);
                      setActiveTab('video');
                    }}
                    className={`p-3 rounded-[6px] border cursor-pointer flex items-center justify-between transition-all ${
                      isActive
                        ? 'border-kappel bg-kappel-15 text-kappel font-bold'
                        : 'border-platinum/40 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-eerie-black-1 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonComplete(idx);
                        }}
                        className="text-xl text-kappel shrink-0"
                      >
                        {isCompleted ? <IoCheckmarkCircle /> : <IoCheckmarkCircleOutline className="text-gray-400" />}
                      </button>
                      <span className="text-[1.4rem] line-clamp-1">{lessonTitle}</span>
                    </div>

                    <IoPlayCircleOutline className="text-xl text-gray-400 shrink-0" />
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default LessonPlayer;
