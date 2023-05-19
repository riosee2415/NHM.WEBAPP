import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
} from "./commonComponents";
import styled from "styled-components";
import Theme from "./Theme";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LOGO_GET_REQUEST } from "../reducers/logo";
import { useRouter } from "next/router";
import useWidth from "../hooks/useWidth";

const GlobalImage = styled(Wrapper)`
  width: auto;
  height: 29px;
  position: relative;
  cursor: pointer;

  & ${Wrapper} {
    opacity: 0;
    z-index: -1;
  }

  &:hover {
    & ${Wrapper} {
      opacity: 1;
      z-index: 1;
    }
  }
`;

const TextHover = styled(Text)`
  font-size: 17px;
  position: relative;
  cursor: pointer;
  color: ${Theme.white_C};

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${Theme.white_C};
    transition: 0.5s;
  }

  &:hover {
    &:before {
      width: 100%;
    }
  }

  ${(props) =>
    props.active &&
    `
      &:before {
        width: 100%;
      }
  `};

  @media (max-width: 900px) {
    color: ${Theme.black_C};
    font-weight: 600;

    &:before {
      height: 2px;
      background: ${Theme.basicTheme_C};
    }

    ${(props) =>
      props.active &&
      `
      color: ${Theme.black_C};
      font-weight: 600;

      &:before {
        height: 2px;
        background: ${Theme.basicTheme_C};
      }
  `};
  }
`;

const AppHeader = ({}) => {
  ////////////// - USE STATE- ///////////////
  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const { logos } = useSelector((state) => state.logo);

  ///////////// - EVENT HANDLER- ////////////

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageY && pageYOffset !== 0 && pageYOffset !== pageY;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  });

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  useEffect(() => {
    dispatch({
      type: LOGO_GET_REQUEST,
    });
  }, []);
  return (
    <>
      <WholeWrapper
        position={`fixed`}
        top={`0`}
        left={`0`}
        height={width < 900 ? `auto` : `90px`}
        bgColor={
          width < 900
            ? Theme.white_C
            : headerScroll
            ? Theme.black_C
            : `transparent`
        }
        zIndex={`100`}
      >
        <RsWrapper>
          <Wrapper
            dr={`row`}
            height={width < 900 ? `70px` : `90px`}
            ju={`space-between`}
            margin={width < 900 ? `10px 0 20px` : `0`}
          >
            {width < 900 ? (
              <>
                {logos &&
                  logos.length !== 0 &&
                  logos.find((data) => data.typeOf === "F") && (
                    <Image
                      width={`54px`}
                      src={logos.find((data) => data.typeOf === "F").imageURL}
                      alt="logo"
                    />
                  )}
              </>
            ) : (
              <>
                {logos &&
                  logos.length !== 0 &&
                  logos.find((data) => data.typeOf === "H") && (
                    <Image
                      width={`54px`}
                      src={logos.find((data) => data.typeOf === "H").imageURL}
                      alt="logo"
                    />
                  )}
              </>
            )}

            <Wrapper
              dr={`row`}
              width={`auto`}
              display={width < 900 ? `none` : `flex`}
            >
              <Link href={`/`}>
                <a>
                  <TextHover active={router.pathname === `/` ? true : false}>
                    About Us
                  </TextHover>
                </a>
              </Link>
              <Link href="/rooms">
                <a>
                  <TextHover
                    active={router.pathname.includes(`/rooms`) ? true : false}
                    margin={`0 54px`}
                  >
                    Rooms
                  </TextHover>
                </a>
              </Link>
              <Link href="/update">
                <a>
                  <TextHover
                    active={router.pathname.includes(`/update`) ? true : false}
                  >
                    Update
                  </TextHover>
                </a>
              </Link>

              <GlobalImage margin={`0 0 0 54px`}>
                <Image
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/header/icon_global.png"
                  alt="image"
                  width={`19px`}
                />

                <Wrapper
                  width={`58px`}
                  bgColor={Theme.white_C}
                  padding={`15px`}
                  radius={`5px`}
                  position={`absolute`}
                  bottom={`-80px`}
                  right={`0`}
                >
                  <Text
                    color={Theme.darkGrey2_C}
                    isHover={true}
                    margin={`0 0 5px`}
                    isActive={true}
                  >
                    ENG
                  </Text>
                  <Text color={Theme.darkGrey2_C} isHover={true}>
                    LAN
                  </Text>
                </Wrapper>
              </GlobalImage>
            </Wrapper>

            <GlobalImage display={width < 900 ? `flex` : `none`}>
              <Image
                src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/header/icon_global_m.png"
                alt="image"
                width={`26px`}
              />

              <Wrapper
                width={`58px`}
                bgColor={Theme.white_C}
                padding={`15px`}
                radius={`5px`}
                position={`absolute`}
                bottom={`-85px`}
                right={`0`}
                shadow={`0px 0px 10px rgba(0,0,0,0.2)`}
              >
                <Text
                  fontSize={`14px`}
                  color={Theme.darkGrey2_C}
                  isHover={true}
                  margin={`0 0 5px`}
                  isActive={true}
                >
                  ENG
                </Text>
                <Text
                  fontSize={`14px`}
                  color={Theme.darkGrey2_C}
                  isHover={true}
                >
                  LAN
                </Text>
              </Wrapper>
            </GlobalImage>
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            margin={`0 0 20px`}
            display={width < 900 ? `flex` : `none`}
          >
            <Link href={`/`}>
              <a>
                <TextHover active={router.pathname === `/` ? true : false}>
                  About Us
                </TextHover>
              </a>
            </Link>
            <Link href={`/rooms`}>
              <a>
                <TextHover
                  active={router.pathname === `/rooms` ? true : false}
                  margin={`0 34px`}
                >
                  Rooms
                </TextHover>
              </a>
            </Link>
            <Link href={`/update`}>
              <a>
                <TextHover
                  active={router.pathname === `/update` ? true : false}
                >
                  Update
                </TextHover>
              </a>
            </Link>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </>
  );
};

export default AppHeader;
