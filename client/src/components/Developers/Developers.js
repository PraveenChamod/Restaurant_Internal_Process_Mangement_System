import { Header } from "../shared/SharedElements/SharedElements";
import * as l from "./DevelopersElements";
const Developers = (props) => {
  console.log(props.developers);
  return (
    <l.Container>
      <Header> Developed By </Header>
      <l.SubContainer>
        {props.developers.map((developer) => {
            return (
            <l.Section>
                <l.Member>
                <l.Image src={developer.img} />
                </l.Member>
                <l.Name>{developer.name}</l.Name>
            </l.Section>
            );
        })}
      </l.SubContainer>
    </l.Container>
  );
};

export default Developers;
