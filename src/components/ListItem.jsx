import { Link } from "react-router-dom";
import { useDispatch, useSelector, dispatch } from "react-redux";
import styled from "styled-components";
import { addClip, deleteClip, updateLocalStorage } from "../store/slice";
import React, { useState } from "react";

const Button = styled.button`
  outline: 0;
  padding: 0.7rem 0;
  width: 120px;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
`;

const NewsItem = styled.li`
  padding: 1rem 1.5%;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  transition: all 0.3s;
`;

const Article = styled.article`
  display: flex;
  justify-content: space-between;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 35%;
  min-height: 170px;
  max-height: 300px;
  background-color: #fff;
`;

const Img = styled.img`
  background-color: #fff;
  display: block;
  width: 100%;
  object-fit: scale-down;
  object-position: 50% 50%;
`;

const RightDiv = styled.div`
  position: relative;
  width: 63%;
  padding: 1rem 0;
`;

const SectionSpan = styled.span`
  font-family: "Oswald", sans-serif;
  color: #666;
  display: block;
`;

const MainArticle = styled.h3`
  font-weight: 700;
  font-size: 1.438rem;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 0.5rem;
  line-height: 1.5em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PublicDate = styled.span`
  margin-top: 0.6rem;
  display: block;
  font-size: 0.938rem;
  color: #999;
`;

const ClipButton = styled(Button)`
  position: absolute;
  right: 140px;
  bottom: 10px;
  background-color: #666;
  color: #fff;
  border: 1px solid #666;
  transition: all 0.3s;
  &:hover {
    color: #666;
    background-color: #fff;
    border: 1px solid #666;
  }
  &.unclip {
    color: #fff;
    background-color: coral;
    border: 1px solid coral;
    &:hover {
      color: coral;
      background-color: #fff;
    }
  }
`;

const AnchorTag = styled.a`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const MoreButton = styled(Button)`
  color: #999;
  background-color: #fff;
  border: 1px solid #999;
  transition: all 0.3s;
  &:hover {
    // background-color: #333;
    color: #000;
    border: 1px solid #000;
  }
`;

export default function ListItem({
  id,
  main,
  date,
  section,
  multimedia,
  web_url,
}) {
  const newsList = useSelector(({ news }) => news.news);
  const clipNewsList = useSelector(({ history }) => history.clip);
  const dispatch = useDispatch();

  const callbackWithUpdateLocalStorage = React.useCallback(
    (callback) => {
      callback();
      dispatch(updateLocalStorage());
    },
    [dispatch]
  );

  const handleClipBtnClick = () => {
    callbackWithUpdateLocalStorage(() => {
      dispatch(addClip({ id, main, date, section, multimedia, web_url }));
    });
  };

  const handleUnClipClick = () => {
    callbackWithUpdateLocalStorage(() => {
      dispatch(deleteClip(id));
    });
  };

  // console.log("ListItem clipNewsList : ", clipNewsList);

  return (
    <NewsItem>
      <Article>
        <ImgWrapper>
          {multimedia.length === 0 ? (
            <Img src="../img/The_New_York_Times_logo.png" />
          ) : (
            <Img src={`http://www.nytimes.com/${multimedia[0].url}`} />
          )}
        </ImgWrapper>
        <RightDiv>
          <SectionSpan>{section}</SectionSpan>
          <MainArticle>{main}</MainArticle>
          <PublicDate className="pub_date">
            {date.replace("T", " ").substring(0, 19)}
          </PublicDate>
          {clipNewsList.map((item) => item.id).includes(id) ? (
            <ClipButton
              className="clip_button unclip"
              onClick={handleUnClipClick}
            >
              unClip this
            </ClipButton>
          ) : (
            <ClipButton className="clip_button" onClick={handleClipBtnClick}>
              Clip this
            </ClipButton>
          )}

          <AnchorTag
            href={web_url}
            target="_blank"
            rel="noopener noreferrer"
            title="open in new window"
          >
            <MoreButton className={"detail_news_button"}>more</MoreButton>
          </AnchorTag>
        </RightDiv>
      </Article>
    </NewsItem>
  );
}
