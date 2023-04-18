import React, { useEffect, useCallback } from "react";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
  CommonButton,
  RsWrapper,
  Text,
  Image,
} from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MAIN_BANNER_REQUEST } from "../../reducers/banner";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { useRef } from "react";

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

  @media (max-width: 900px) {
    width: 34px;
    height: 34px;
  }
`;

const MainSliderWrapper = styled(RowWrapper)`
  position: relative;
  & .ant-carousel {
    width: 100%;
  }
`;

const RoomsSlider = ({ datum }) => {
  const width = useWidth();

  const slideRef = useRef();
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const { me } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: MAIN_BANNER_REQUEST,
    });
  }, [me]);

  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);

  return (
    <MainSliderWrapper>
      <Wrapper
        position={`absolute`}
        top={`50%`}
        left={`0`}
        padding={width < 900 ? `0 10px` : `0 20px`}
        zIndex={`2`}
        dr={`row`}
        ju={`space-between`}
      >
        <ArrowBox onClick={() => slideRef.current.prev()}>
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

      <Carousel
        autoplay={false}
        speed={3000}
        slidesToShow={1}
        dots={false}
        draggable={true}
        ref={slideRef}
      >
        {datum &&
          datum.map((data) => {
            return (
              <Wrapper>
                <Image
                  height={width < 900 ? `177px` : `680px`}
                  radius={`20px`}
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/nhm/assets/images/rooms/img_detail.png"
                  alt="image"
                />
              </Wrapper>
            );
          })}
      </Carousel>
    </MainSliderWrapper>
  );
};

export default RoomsSlider;
