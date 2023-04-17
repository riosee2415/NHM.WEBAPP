import React, { useEffect, useCallback, useRef } from "react";
import { RowWrapper, Wrapper, Image } from "../commonComponents";
import styled from "styled-components";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const ArrowBox = styled(Wrapper)`
  width: 46px;
  height: 46px;
  position: relative;
  cursor: pointer;

  & .noHoverImage,
  & .hoverImage {
    transition: 0.5s;
  }

  & .hoverImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: -1;
  }

  &:hover {
    & .hoverImage {
      opacity: 1;
      z-index: 1;
    }

    & .noHoverImage {
      opacity: 0;
      z-index: -1;
    }
  }
`;

const Box = styled(Wrapper)`
  cursor: pointer;
  padding: 0 10px;

  & .line {
    background: ${Theme.grey_C};
  }

  &:hover {
    & .line {
      background: ${Theme.basicTheme_C};
    }
  }
`;

const MainSliderWrapper = styled(RowWrapper)`
  & .slick-list {
    height: 82px;
  }

  & .ant-carousel {
    width: 100%;
  }
`;

const UpdateSlider = ({ datum }) => {
  const width = useWidth();
  const router = useRouter();

  const slideRef = useRef();

  return (
    <MainSliderWrapper>
      <Carousel
        autoplay={false}
        slidesToShow={width < 900 ? 1 : 4}
        ref={slideRef}
      >
        {datum &&
          datum.map((data, idx) => {
            return (
              <Box>
                <Wrapper
                  className="line"
                  height={`2px`}
                  margin={`0 0 20px`}
                ></Wrapper>

                <Wrapper
                  height={`60px`}
                  al={`flex-start`}
                  ju={`flex-start`}
                  fontSize={`20px`}
                  fontWeight={`600`}
                >
                  Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,
                </Wrapper>
              </Box>
            );
          })}
      </Carousel>

      <Wrapper dr={`row`} ju={`flex-end`} margin={`40px 0 0`}>
        <ArrowBox margin={`0 10px 0 0`} onClick={() => slideRef.current.prev()}>
          <Image
            className="noHoverImage"
            src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/icon_prev.png"
            alt="btnImage"
            width={`100%`}
            height={`100%`}
          />
          <Image
            className="hoverImage"
            src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/icon_prev_h.png"
            alt="btnImage"
            width={`100%`}
            height={`100%`}
          />
        </ArrowBox>

        <ArrowBox onClick={() => slideRef.current.next()}>
          <Image
            className="noHoverImage"
            src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/icon_next.png"
            alt="btnImage"
            width={`100%`}
            height={`100%`}
          />
          <Image
            className="hoverImage"
            src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/main/icon_next_h.png"
            alt="btnImage"
            width={`100%`}
            height={`100%`}
          />
        </ArrowBox>
      </Wrapper>
    </MainSliderWrapper>
  );
};

export default UpdateSlider;
