import { FC } from "react";
import styles from "./AboutUs.module.scss";
import photoDenis from "../../assets/images/photo_Denis.jfif";
import photoIhor from "../../assets/images/photo_Ihor.jpg";
import photoLiza from "../../assets/images/photo_Liza.png";
import { Link } from "react-router-dom";

const AboutUs: FC = () => {
  return (
    <>
      <section className={styles.wrapper}>
        <section className={styles.cardDeveloper}>
          <img src={photoDenis} alt="Denis Bezgubov" className={styles.foto} />
          <div className={styles.info}>
            <h2>Denis Bezgubov</h2>
            <h3 className={styles.role}>Team lead</h3>
            <p>
              "I studied frontend at RSSchools for more than a year, at the same
              time I was self-taught in the field of web development."
            </p>
            <Link to={"https://github.com/Zixail28"} target="_blank">
              @Zixail28
            </Link>
            <h3>Contributions</h3>
            <ul>
              <li>Repository Setup</li>
              <li>Development Environment Configuration</li>
              <li>Development Scripts</li>
              <li>Comprehensive README</li>
              <li>Basket Page</li>
              <li>Routing</li>
            </ul>
          </div>
        </section>
        <section className={styles.cardDeveloper}>
          <img src={photoIhor} alt="Ihor Serhiienko" className={styles.foto} />
          <div className={styles.info}>
            <h2>Ihor Serhiienko</h2>
            <h3 className={styles.role}>Front-end developer</h3>
            <p>
              "I am a beginner front end developer, passionate about learning
              JavaScript, and I particularly enjoy creating web interfaces using
              React.
            </p>
            <p>
              I explore the latest JavaScript features to enhance web
              development. It's my calling to excel in JavaScript and React,
              crafting creative and practical projects.
            </p>
            <p>I studied frontend at RSSchools from 2022."</p>
            <Link to={"https://github.com/ISerhiienko"} target="_blank">
              @ISerhiienko
            </Link>
            <h3>Contributions</h3>
            <ul>
              <li>CommerceTools Project and API Client Setup</li>
              <li>Login Page</li>
              <li>Registration Page</li>
              <li>User Profile Page</li>
              <li>Detailed Product Page</li>
            </ul>
          </div>
        </section>
        <section className={styles.cardDeveloper}>
          <img
            src={photoLiza}
            alt="Lizaveta Nikiforova"
            className={styles.foto}
          />
          <div className={styles.info}>
            <h2>Lizaveta Nikiforova</h2>
            <h3 className={styles.role}>Front-end developer</h3>
            <p>
              "I'm a junior in front-end development using Java-script. My goal
              is to learn how to create convenient and useful applications. This
              is my first project using React."
            </p>
            <p>I love programming and I want my work to benefit people.</p>
            <p>I studied frontend at RSSchools from 2022."</p>
            <Link to={"https://github.com/LizavetaNik"} target="_blank">
              @LizavetaNik
            </Link>
            <h3>Contributions</h3>
            <ul>
              <li>Task Board Setup - Jira</li>
              <li>Main Page</li>
              <li>Catalog Page</li>
              <li>Detailed Product Page</li>
              <li>About Us Page</li>
            </ul>
          </div>
        </section>
        <section className={styles.collaboration}>
          <h2>Collaboration </h2>
          <p>
            This is a list of tools that the team used to implement the project
            and achieve a successful result.
          </p>
          <ul>
            <li>
              Jira. All sprint tasks were described in Jira and responsible
              persons were assigned.
            </li>
            <li>
              Discord. A channel was created in Diskoret. The channel had
              sections: materials - only the necessary links for the project;
              git - description and solution of problems associated with the
              git; all - for discussing general topics.
            </li>
            <li>
              GitHub. We used GitHub for parallel development and saving the
              history of project changes.
            </li>
            <li>Meeting. The team met regularly through the Discor channel.</li>
          </ul>
        </section>
      </section>
    </>
  );
};

export default AboutUs;
