import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../utils/style/colors';
import { Loader } from '../../../utils/style/Atoms';
import { SurveyContext } from '../../../utils/context';

interface SurveyData {
  [key: string]: string;
}

interface ReplyBox {
  isSelected: boolean;
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

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReplyBox = styled.button<{ isSelected: boolean }>`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`;

function Survey() {
  const { questionNumber } = useParams<string>();
  const questionNumberInt = questionNumber ? parseInt(questionNumber) : 1;
  const previousQuestion = questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestion = questionNumberInt + 1;
  const [surveyData, setSurveyData] = useState<SurveyData>({});
  const [isDataLoading, setDataLoading] = useState(false);
  const { answers, saveAnswers } = useContext<any>(SurveyContext);
  const [error, setError] = useState(false);

  function saveReply(answer: boolean) {
    if (questionNumber) {
      saveAnswers({ [questionNumber]: answer });
    }
  }

  useEffect(() => {
    async function fetchSurvey() {
      setDataLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/survey`);
        const { surveyData } = await response.json();
        setSurveyData(surveyData);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setDataLoading(false);
      }
    }
    fetchSurvey();
  }, []);

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber!]}</QuestionContent>
      )}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={
            questionNumber !== undefined && answers[questionNumber] === true
          }
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={
            questionNumber !== undefined && answers[questionNumber] === false
          }
        >
          Non
        </ReplyBox>
      </ReplyWrapper>

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
