
import styled from "styled-components";






/*CONTAINER BAJO DEL CARD SHOES, DONDE ESTAN 
EL TEXTO DE DEVELOPER FULLSTACK */
/*  padding: 2.5em 6px 0 6px;*/
const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

`;
/*CONTENEDOR DE LAS LETRAS*/
const SpacedHorizontalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
 
`;
/*TITLE color: #4D5656;*/
const SmallText = styled.span`
  color: #fff;
  font-size: 1.3em;
  font-weight: 700;

`;
/*DESCRIPTION*/ /*text-transform: uppercase; /*color: #000;*/
const MediumText = styled.span`

  font-size: 0.9em;
  letter-spacing: normal;
  line-height: 20px;
  margin-top:8px;
`;






export function SkillDetails(_props) {
  return (
    <DetailsContainer className="skill-container-description" >
       {/*font-serif font-line */}
      <SmallText className="skill-detail-small-movil  underline underline-offset-8"><h1>Developer Full Stack</h1></SmallText>

      {/*text-neutral-900 */} {/*font-serif font-line */}
      <SpacedHorizontalContainer>
        <MediumText className="skill-detail-medium-movil text-white"><p>Django RestFramework como Backend y React como Frontend
        Basico 1 | Intermedio 2 | Experto 3 </p>
        </MediumText>
      </SpacedHorizontalContainer>

   
  
      <SpacedHorizontalContainer>
        <MediumText>
          {/*Y React como Frontend*/}
          </MediumText>
        {/*<BuyButton>BUY</BuyButton>*/}
      </SpacedHorizontalContainer>






    </DetailsContainer>
  );
}
