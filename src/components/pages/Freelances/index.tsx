import DefaultPicture from '../../../assets/profile.png';
import Card from '../../Card';
import styled from 'styled-components';
import colors from '../../../utils/style/colors';
import { useEffect, useState } from 'react';
import { Loader } from '../../../utils/style/Atoms';

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-rows: auto;
    grid-template-columns: 1fr;
  }
`;

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  text-align: center;
  padding-bottom: 30px;
`;

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`;
interface FreelanceData {
  id: string;
  name: string;
  job: string;
  picture: string;
}

function Freelances() {
  const [freelanceData, setFreelanceData] = useState<FreelanceData[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isDataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(true);
    fetch(`http://localhost:8000/freelances`).then((response) =>
      response
        .json()
        .then(({ freelancersList }) => {
          setFreelanceData(freelancersList);
          setDataLoading(false);
        })
        .catch((error) => setError(true))
    );
  }, []);

  if (error) return <span>Oups il y a eu un problème</span>;

    return (
      <div>
        <PageTitle>Trouvez votre prestataire</PageTitle>
        <PageSubtitle>
          Chez Shiny nous réunissons les meilleurs profils pour vous.
        </PageSubtitle>

        {isDataLoading ? (
          <Loader />
        ) : (
          <CardsContainer>
            {freelanceData.map((profile, index) => (
              <Card
                key={`${profile.name}-${index}`}
                label={profile.job}
                picture={profile.picture}
                title={profile.name}
              />
            ))}
          </CardsContainer>
        )}
      </div>
    );
}

export default Freelances;
