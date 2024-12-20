import "../components/css/Summary.css";
import Container from "../components/layout/Container";
import pencilwhite from "../assets/image/pencilwhite.png";
import hookwhite from "../assets/image/hookwhite.png";
import urgent from "../assets/image/urgent.png";

export default function Summary() {
  const summaryData = [
    {
      id: 1,
      image: pencilwhite,
      amount: 1,
      description: "To-do",
      width: "264px",
    },
    {
      id: 2,
      image: hookwhite,
      amount: 1,
      description: "Done",
      width: "264px",
    },
    {
      id: 3,
      image: urgent,
      amount: 1,
      description: "Urgent",
      date: "20 December 2024",
      title: "Upcoming Deadline",
      width: "560px",
    },
    {
      id: 4,
      amount: 5,
      description: "Tasks in Board",
      width: "168px",
    },
    {
      id: 5,
      amount: 2,
      description: "Tasks in Progress",
      width: "168px",
    },
    {
      id: 6,
      amount: 2,
      description: "Awaiting Feedback",
      width: "168px",
    },
  ];

  function greetingHandler() {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Day";
    } else {
      return "Good Evening";
    }
  }

  return (
    <section>
      <header className="oversign">
        <h1>Join 360</h1>
        <div className="dash"></div>
        <h2>Key Metrics at a Glance</h2>
      </header>
      <main className="container-summary">
        <div className="summary-grid">
          {summaryData.map((item) => (
            <Container
              key={item.id}
              image={item.image}
              amount={item.amount}
              description={item.description}
              date={item.date}
              title={item.title}
              width={item.width}
              className="summary-item"
            />
          ))}
        </div>
        <div className="container-greeting">
          <h3>{greetingHandler()},</h3>
          <h4>Sebastian Ebel</h4>
        </div>
      </main>
    </section>
  );
}
