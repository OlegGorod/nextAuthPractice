import Products from '../products/products';
import classes from './starting-page.module.css';

function StartingPageContent() {

  return (
    <section className={classes.starting}>
      <Products/>
    </section>
  );
}

export default StartingPageContent;
