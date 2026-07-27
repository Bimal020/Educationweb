import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useNotifications } from '../context/NotificationContext';
import {
  IoAddCircleOutline,
  IoStatsChartOutline,
  IoPeopleOutline,
  IoCashOutline,
  IoBookOutline,
  IoStar,
  IoCheckmarkCircle,
  IoImageOutline,
} from 'react-icons/io5';

function InstructorDashboard() {
  const { courses, addCourse } = useCourses();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'create'
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '1',
    level: 'Beginner',
    price: '49.99',
    duration: '12h 30m',
    lessons: '8',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=350',
    description: '',
    lessonsListInput: 'Course Introduction, Essential Tools & Setup, Core Fundamentals, Building Real World Project, Performance Optimization, Final Assessment & Deployment',
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const lessonsArr = formData.lessonsListInput
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);

    const newCourseObj = {
      id: `course_${Date.now()}`,
      title: formData.title,
      categoryId: formData.categoryId,
      level: formData.level,
      price: parseFloat(formData.price) || 0,
      duration: formData.duration,
      lessons: lessonsArr.length || parseInt(formData.lessons) || 6,
      lessonsList: lessonsArr.length ? lessonsArr : ['Introduction', 'Module 1', 'Module 2', 'Summary'],
      rating: 5.0,
      reviewsCount: 1,
      students: 1,
      image: formData.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=350',
      description: formData.description || 'Comprehensive interactive learning course designed for modern software developers.',
      teacherId: 'teacher_1',
      createdAt: new Date().toISOString(),
    };

    addCourse(newCourseObj);
    addNotification('New Course Created! 🚀', `Your course "${newCourseObj.title}" has been published successfully.`);
    setSuccessMsg('Course published successfully! Redirecting...');
    
    setTimeout(() => {
      setSuccessMsg('');
      setActiveTab('courses');
    }, 1500);
  };

  const totalStudents = courses.reduce((acc, c) => acc + (c.students || 0), 0);
  const totalEarnings = courses.reduce((acc, c) => acc + (c.price * (c.students || 1)), 0);

  return (
    <div className="instructor-dashboard bg-slate-50 dark:bg-slate-950 min-h-screen py-10 text-left">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <span className="text-[1.3rem] font-spartan text-kappel font-bold uppercase tracking-wider">
              Instructor Portal
            </span>
            <h1 className="h1 font-spartan text-eerie-black-1 dark:text-white font-bold">
              Instructor Dashboard
            </h1>
          </div>

          <button
            onClick={() => setActiveTab(activeTab === 'create' ? 'courses' : 'create')}
            className="btn has-before text-[1.5rem] flex items-center gap-2"
          >
            <IoAddCircleOutline className="text-2xl" />
            <span>{activeTab === 'create' ? 'Back to Courses' : 'Create New Course'}</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-[10px] p-6 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-kappel flex items-center justify-center text-3xl shrink-0">
              <IoBookOutline />
            </div>
            <div>
              <p className="text-[1.3rem] text-gray-web dark:text-slate-400 font-medium">Published Courses</p>
              <h3 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 dark:text-white">{courses.length}</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-[10px] p-6 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl shrink-0">
              <IoPeopleOutline />
            </div>
            <div>
              <p className="text-[1.3rem] text-gray-web dark:text-slate-400 font-medium">Total Students</p>
              <h3 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 dark:text-white">{totalStudents}</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-[10px] p-6 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shrink-0">
              <IoCashOutline />
            </div>
            <div>
              <p className="text-[1.3rem] text-gray-web dark:text-slate-400 font-medium">Est. Revenue</p>
              <h3 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 dark:text-white">${totalEarnings.toFixed(2)}</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-[10px] p-6 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl shrink-0">
              <IoStar />
            </div>
            <div>
              <p className="text-[1.3rem] text-gray-web dark:text-slate-400 font-medium">Instructor Rating</p>
              <h3 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 dark:text-white">4.9 / 5.0</h3>
            </div>
          </div>
        </div>

        {/* Tab 1: Course List */}
        {activeTab === 'courses' && (
          <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-[12px] p-6 shadow-sm">
            <h2 className="font-spartan text-[2.2rem] font-bold text-eerie-black-1 dark:text-white mb-6 border-b border-platinum/40 dark:border-slate-800 pb-3">
              Your Active Courses ({courses.length})
            </h2>

            <div className="divide-y divide-platinum/40 dark:divide-slate-800">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-3 rounded-[8px] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-[100px] aspect-[16/10] object-cover rounded-[6px]"
                    />
                    <div>
                      <span className="bg-kappel-15 text-kappel font-spartan text-[1.2rem] font-bold px-2 py-0.5 rounded-[3px]">
                        {course.level}
                      </span>
                      <h4 className="font-spartan font-bold text-[1.8rem] text-eerie-black-1 dark:text-white mt-1">
                        <Link to={`/courses/${course.id}`} className="hover:text-kappel transition-colors">
                          {course.title}
                        </Link>
                      </h4>
                      <p className="text-[1.3rem] text-gray-web dark:text-slate-400 font-sans">
                        {course.students} Students • {course.lessons} Lessons • ${course.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/courses/${course.id}`}
                      className="px-4 py-2 border border-platinum/80 dark:border-slate-700 rounded-[6px] text-[1.4rem] font-spartan font-medium text-eerie-black-1 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      View Page
                    </Link>
                    <Link
                      to={`/courses/${course.id}/learn`}
                      className="btn has-before text-[1.4rem] px-4 py-2"
                    >
                      Player View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Create Course Form */}
        {activeTab === 'create' && (
          <div className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-[12px] p-8 shadow-sm max-w-[800px] mx-auto">
            <h2 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 dark:text-white mb-2">
              Create & Publish New Course
            </h2>
            <p className="text-[1.4rem] text-gray-web dark:text-slate-400 mb-6 font-sans">
              Fill in the course parameters below to make your educational curriculum available immediately.
            </p>

            {successMsg && (
              <div className="p-4 bg-green-100 text-green-700 rounded-[6px] text-[1.5rem] font-bold mb-6 flex items-center gap-2">
                <IoCheckmarkCircle className="text-2xl" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 font-sans">
              <div>
                <label className="block text-[1.4rem] font-bold text-eerie-black-1 dark:text-slate-200 mb-1 font-spartan">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Master Full Stack Web Development with React"
                  required
                  className="p-3 border border-platinum/80 dark:border-slate-700 rounded-[6px] text-[1.5rem] focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[1.4rem] font-bold text-eerie-black-1 dark:text-slate-200 mb-1 font-spartan">
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="p-3 border border-platinum/80 dark:border-slate-700 rounded-[6px] text-[1.4rem] w-full focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[1.4rem] font-bold text-eerie-black-1 dark:text-slate-200 mb-1 font-spartan">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="p-3 border border-platinum/80 dark:border-slate-700 rounded-[6px] text-[1.4rem] focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[1.4rem] font-bold text-eerie-black-1 dark:text-slate-200 mb-1 font-spartan">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="p-3 border border-platinum/80 dark:border-slate-700 rounded-[6px] text-[1.4rem] focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[1.4rem] font-bold text-eerie-black-1 dark:text-slate-200 mb-1 font-spartan">
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="p-3 border border-platinum/80 dark:border-slate-700 rounded-[6px] text-[1.4rem] focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-bold text-eerie-black-1 dark:text-slate-200 mb-1 font-spartan">
                  Lessons Syllabus (Comma separated list)
                </label>
                <textarea
                  rows="3"
                  name="lessonsListInput"
                  value={formData.lessonsListInput}
                  onChange={handleChange}
                  className="p-3 border border-platinum/80 dark:border-slate-700 rounded-[6px] text-[1.4rem] focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-[1.4rem] font-bold text-eerie-black-1 dark:text-slate-200 mb-1 font-spartan">
                  Course Description
                </label>
                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Explain what students will learn in this course..."
                  className="p-3 border border-platinum/80 dark:border-slate-700 rounded-[6px] text-[1.4rem] focus:outline-none focus:border-kappel dark:bg-slate-950 dark:text-white"
                ></textarea>
              </div>

              <button type="submit" className="btn has-before w-full justify-center text-[1.6rem] py-3">
                Publish Course Now
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;
