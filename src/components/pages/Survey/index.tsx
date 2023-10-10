import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../utils/style/colors';
import { Loader } from '../../../utils/style/Atoms';

interface SurveyData {
  [key: string]: string;
}

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`;

const QuestionContent = styled.span`
  margin: 30px;
`;

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`;

function Survey() {
  const { questionNumber } = useParams<string>();
  const questionNumberInt = questionNumber ? parseInt(questionNumber) : 1;
  const previousQuestion = questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestion = questionNumberInt + 1;
  const [surveyData, setSurveyData] = useState<SurveyData>({});
  const [isDataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(true);
    fetch(`http://localhost:8000/survey`).then((response) =>
      response.json().then(({ surveyData }) => {
        setSurveyData(surveyData);
        setDataLoading(false);
      })
    );
  }, []);

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber!]}</QuestionContent>
      )}
      <LinkWrapper>
        <Link to={`/survey/${previousQuestion}`}>Précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestion}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
}

export default Survey;
