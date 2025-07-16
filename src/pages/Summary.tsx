import styles from "../components/css/Summary.module.css";
import ContainerSummary from "../components/layout/ContainerSummary";
import { useData } from "../hooks/useData";
import { summaryData } from "../types/data";

export default function Summary() {
  const { user } = useData();

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
      <header className={styles["oversign"]}>
        <h1>Join 360</h1>
        <div className={styles["dash"]}></div>
        <h2>Key Metrics at a Glance</h2>
      </header>
      <main className={styles["container-summary"]}>
        <div className={styles["summary-grid"]}>
          {summaryData.map((item) => (
            <ContainerSummary
              key={item.id}
              image={item.image}
              amount={item.amount}
              description={item.description}
              date={item.date}
              title={item.title}
              width={item.width}
              className={styles["summary-item"]}
            />
          ))}
        </div>
        <div className={styles["container-greeting"]}>
          <h3>{greetingHandler()},</h3>
          <h4>{user.name}</h4>
        </div>
      </main>
    </section>
  );
}
