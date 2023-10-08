import { useParams, Link } from 'react-router-dom';
function Survey() {
  const { questionNumber } = useParams<string>();
  const questionNumberInt = questionNumber ? parseInt(questionNumber) : 1;
  const previousQuestion = questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestion = questionNumberInt + 1;

  console.log(nextQuestion);

  return (
    <div>
      <h1>Questionnaire</h1>
      <h2>{questionNumber}</h2>
      <Link to={`/survey/${previousQuestion}`}>Précédent</Link>
      {questionNumberInt === 10 ? (
        <Link to="/survey/results">Résultats</Link>
      ) : (
        <Link to={`/survey/${nextQuestion}`}>Suivant</Link>
      )}
    </div>
  );
}

export default Survey;
