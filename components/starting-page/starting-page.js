import classes from './starting-page.module.css';

function StartingPageContent() {
  // Show Link to Login page if NOT auth

  return (
    <section className={classes.starting}>
      <h1>Let's start</h1>
    </section>
  );
}

export default StartingPageContent;
