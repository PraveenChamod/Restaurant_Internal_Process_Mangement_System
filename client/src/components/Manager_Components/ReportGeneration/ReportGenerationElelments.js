import styled from "styled-components";
import { FileIcon } from "react-file-icon";
import { RegularButton } from "../../shared/SharedElements/Buttons";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50rem;
  height: 25rem;
  background-color: #1a1e21;
  border-radius: 25px;
  box-shadow: 3px 3px 3px #000;
`;
export const ButtonArea = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const CustomRegularButton = styled(RegularButton)`
  width: 300px;
  height: 50px;
  font-size: 20px;
`;
export const StyledFileIcon = styled(FileIcon)`
  width: 1px;
  height: 1px;
`;
export const Icon = styled.div`
  margin: 5%;
`;
export const Div3 = styled.div`
  margin-top: 15px;
  width: 50rem;
  height: 8%;
  display: flex;
  flex-direction: column;
`;
