
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
  font-size: 1.4em;
  font-weight: 700;

`;
/*DESCRIPTION*/ /*text-transform: uppercase; /*color: #000;*/
const MediumText = styled.span`

  font-size: 1em;
  letter-spacing: normal;
  line-height: 20px;
  margin-top:8px;
`;






export function SkillDetails(_props) {
  return (
    <DetailsContainer className="skill-container-description h-[9rem]" >

      <SmallText className="skill-detail-small-movil font-serif underline underline-offset-8"><h1>Developer Full Stack</h1></SmallText>

      <SpacedHorizontalContainer>
        <MediumText className="skill-detail-medium-movil font-serif font-line text-neutral-900"><p>Django RestFramework como Backend y React como Frontend
          Nivel Basico 1 | Nivel Intermedio 2 | Nivel Experto 3 </p>
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
