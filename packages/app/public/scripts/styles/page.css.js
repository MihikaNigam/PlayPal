import { css } from "@calpoly/mustang";

const styles = css`
  .lobby-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 3px;
  }

   .gamer-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 3px;
  }

  .card {
    background-color: rgba(var(--color-background-page), 0.8);
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: var(--spacing-medium);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }

  .card:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Darker shadow on hover */
    transform: translateY(-5px); /* Lift the card */
  }

  /* Title styling */
  .card h4 {
    font-size: var(--font-size-large);
    font-weight: bold;
    color: var(--color-text); /* Text color for light mode */
    margin-top: var(--spacing-small);
  }

  /* Link styling */
  .card a {
    display: block;
    margin-bottom: var(
      --spacing-medium
    ); /* Space between game-instance and title */
    color: var(--color-link); /* Link color using accent */
    text-decoration: none;
  }

  body.dark-mode .card {
    background-color: rgba(
      var(--color-background-page),
      0.9
    ); /* Darker translucent background */
    color: var(--color-text-inverted); /* Light text for dark mode */
  }

  body.dark-mode .card h4 {
    color: var(--color-text-inverted); /* Inverted text color in dark mode */
  }
`;

export default { styles };
