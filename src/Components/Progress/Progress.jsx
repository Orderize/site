import React from "react";
import styles from "./Progress.module.css";

const Progress = ({ currentStep, totalSteps }) => {
    const steps = [];
  
    for (let i = 1; i <= totalSteps; i++) {
      steps.push(
        <React.Fragment key={i}>
          <div className={`${styles.stepCircle} ${i <= currentStep ? styles.active : ""}`}>
            <p>{i}</p>
          </div>

          {i < totalSteps && (
            <div className={`${styles.stepLine} ${i < currentStep ? styles.activeLine : ""}`}></div>
          )}
        </React.Fragment>
      );
    }

  return <div className={styles.progressContainer}>{steps}</div>;
};

export default Progress;