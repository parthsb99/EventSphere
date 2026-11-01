
import { useState } from "react";
import { useEvents } from "./context/EventContext.jsx";

// Event Data
const events = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    category: "Technology",
    date: "12 November 2026",
    time: "10:00 AM",
    location: "Mumbai",
    description: "Explore the latest trends in AI and technology.",
  },
  {
    id: 2,
    title: "Music Fest 2026",
    category: "Entertainment",
    date: "15 November 2026",
    time: "6:00 PM",
    location: "Pune",
    description: "Enjoy live performances and amazing music.",
  },
  {
    id: 3,
    title: "Startup Workshop",
    category: "Workshop",
    date: "20 November 2026",
    time: "11:00 AM",
    location: "Mumbai",
    description: "Learn how to turn your startup idea into reality.",
  },
];

function App() {
  // Local state using useState
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Shared state using Context API and useContext
  const { registered, handleRegister } = useEvents();

  // Search and Category Filtering
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">
          EventSphere
        </h1>

        <div className="flex gap-8 font-medium">
          <a href="#home" className="hover:text-indigo-700">
            Home
          </a>
          <a href="#events" className="hover:text-indigo-700">
            Events
          </a>
          <a href="#contact" className="hover:text-indigo-700">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="text-center py-14 bg-indigo-700 text-white"
      >
        <h2 className="text-4xl font-bold mb-4">
          Discover Amazing Events
        </h2>

        <p className="text-lg">
          Explore, search and register for exciting events.
        </p>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="px-8 py-10 max-w-7xl mx-auto"
      >

        {/* Heading and Registration Counter */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Upcoming Events
          </h2>

          <div className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-lg font-semibold">
            Registered Events: {registered.length}
          </div>
        </div>

        {/* Search and Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 flex-1 min-w-48 bg-white"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-5 py-3 bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Workshop">Workshop</option>
          </select>

        </div>

        {/* Dynamic Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col hover:shadow-xl transition duration-300"
            >

              {/* Event Category */}
              <span className="text-indigo-600 font-semibold text-sm mb-3">
                {event.category}
              </span>

              {/* Event Title */}
              <h3 className="text-xl font-bold mb-3">
                {event.title}
              </h3>

              {/* Event Description */}
              <p className="text-gray-600 mb-5">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-2 text-gray-700 mb-6">
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Time:</strong> {event.time}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              </div>

              {/* Registration Button */}
              <button
                onClick={() => handleRegister(event.id)}
                className={`mt-auto w-full py-3 rounded-lg font-semibold transition cursor-pointer ${
                  registered.includes(event.id)
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-indigo-700 text-white hover:bg-indigo-800"
                }`}
              >
                {registered.includes(event.id)
                  ? "Registered ✓"
                  : "Register Now"}
              </button>

            </div>
          ))}

        </div>

        {/* Conditional Rendering */}
        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No events found.
          </p>
        )}

      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="text-center bg-gray-900 text-white py-6 mt-10"
      >
        <p>Contact: eventsphere@gmail.com</p>
        <p className="mt-2 text-sm">
          © 2026 EventSphere. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;
