import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Icon } from "antd";
import { getHotShowing, getContentBySearch } from "../api";
import * as _ from "lodash";
import { serialize } from "../utils";
import "pages/Home/index.less";

function TopNav(props: iTopNavProps) {
  let [hostShowTitle, setHostShowTitle] = useState<string>("");
  let [hotShowList, setHotShowList] = useState<any>([]);
  let [suggestList, setSuggestList] = useState<any>([]);
  let [searchHistory] = useState(getSearchHistory().slice(0));
  let [searchStr, setSearchStr] = useState<string>("");
  let [isShowSuggestBox, setIsShowSuggestBox] = useState<boolean>(false);
  let [isShowTipsPanel, setIsShowTipsPanel] = useState<boolean>(true);

  function navToSearch() {
    searchStr = searchStr.trim();

    if (searchStr === "") {
      searchStr = hostShowTitle;
    }

    let query: iSearchParams = {
      q: searchStr
    };

    let search = serialize(query);

    props.history.push({
      pathname: "/search",
      search
    });
  }

  function getSearchHistory() {
    const KEY = "SEARCH_H";
    let cache = JSON.parse(localStorage.getItem(KEY) || "[]");
    return cache;
  }

  function addSearchHistory(item: iSearchHistory) {
    const MAX_LEN_CACHE_SEARCH = 5;
    const KEY = "SEARCH_H";
    let cache = getSearchHistory().slice(0);

    let isExist = cache.some((c: iSearchHistory) => c.id === item.id);
    setSearchStr(item.title);
    setIsShowSuggestBox(false);
    if (!isExist) {
      cache.unshift(item);
      if (cache.length > MAX_LEN_CACHE_SEARCH) {
        cache.pop();
      }
      localStorage.setItem(KEY, JSON.stringify(cache));
    }
  }

  function getContentBySearchDebounce() {
    // lodash 防抖
    return _.debounce(function(value) {
      getContentBySearch(value, {
        count: 5
      }).then((res: AxiosResponse) => {
        if (!res) return;
        let { subjects = "" } = res.data || {};
        setSuggestList(subjects);
      });
    }, 5e2);
  }

  function getSearch(ev: any) {
    let value = ev.target.value;
    let str = value.trim();
    let isValid = str.length > 0;

    setSearchStr(value);
    setIsShowTipsPanel(!isValid);

    // close showlist
    isValid && getSuggestionBySearch(str);
  }

  function closeSuggest() {
    setIsShowSuggestBox(false);
  }

  function renderTopBar() {
    return (
      <div className="header-bar">
        <div>
          <div className="bar-container clearfix">
            <span className="bar-top">
              <div className="logo" />
              <div className="slot-title">{props.slotTitle}</div>
            </span>
            <div className="search">
              <div className="search-box">
                <div className="search-btn" onClick={navToSearch}>
                  <Icon type="search" />
                  <span>全网搜</span>
                </div>
                <input
                  className="search-input"
                  placeholder={hostShowTitle}
                  value={searchStr}
                  onChange={getSearch}
                  onClick={ev => {
                    // react有原生事件阻止事件冒泡到父组件
                    ev.nativeEvent.stopImmediatePropagation();
                    setIsShowSuggestBox(true);
                  }}
                  onKeyDown={ev => {
                    setIsShowSuggestBox(true);
                    if (ev.keyCode === 13) {
                      setIsShowSuggestBox(false);
                      navToSearch();
                    }
                  }}
                />
              </div>
              <div
                className="search-list"
                style={{
                  display: isShowSuggestBox ? "block" : "none"
                }}
                onClick={ev => {
                  // react 阻止事件冒泡
                  ev.nativeEvent.stopImmediatePropagation();
                }}
              >
                {isShowTipsPanel ? (
                  <div>
                    <div
                      className="list-history"
                      style={{
                        display: searchHistory.length > 0 ? "block" : "none"
                      }}
                    >
                      <h4 className="panel-title">历史记录</h4>
                      <ul>
                        {searchHistory &&
                          searchHistory.map(
                            (item: iSearchHistory, index: number) => {
                              return (
                                <li className="list-item" key={index}>
                                  <Link to={`/detail/${item.id}`}>
                                    <h5 className="title">{item.title}</h5>
                                  </Link>
                                </li>
                              );
                            }
                          )}
                      </ul>
                    </div>
                    <div className="list-hot">
                      <h4 className="panel-title">热映</h4>
                      <ul>
                        {hotShowList &&
                          hotShowList
                            .slice(0, 8)
                            .map((item: any, index: number) => {
                              return (
                                <li className="list-item" key={index}>
                                  <Link
                                    to={`/detail/${item.id}`}
                                    onClick={(ev: any) => {
                                      addSearchHistory({
                                        id: item.id,
                                        title: item.title
                                      });
                                    }}
                                  >
                                    <span className="index">{+index + 1}</span>
                                    <span className="title">{item.title}</span>
                                  </Link>
                                </li>
                              );
                            })}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="list-suggest">
                    <ul>
                      {suggestList &&
                        suggestList.map((item: any, index: number) => {
                          return (
                            <li className="list-item" key={index}>
                              <Link
                                to={`/detail/${item.id}`}
                                onClick={(ev: any) => {
                                  addSearchHistory({
                                    id: item.id,
                                    title: item.title
                                  });
                                }}
                              >
                                <h5 className="title">{item.title}</h5>
                                <p className="origin_title">
                                  {item.original_title}
                                </p>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let getSuggestionBySearch = getContentBySearchDebounce();

  // componentDidMount
  useEffect(() => {
    getHotShowing({
      start: 0,
      count: 12
    }).then((res: AxiosResponse) => {
      if (!res) return;
      let { subjects = "" } = res.data || {};

      let title =
        Array.isArray(subjects) && subjects.length > 0 ? subjects[0].title : "";

      setHostShowTitle(title);
      setHotShowList(subjects);
    });

    document.addEventListener("click", closeSuggest);

    return () => {
      // componentWillUnMount
      document.removeEventListener("click", closeSuggest);
    };
  }, []);

  if (props.noAffix) {
    return renderTopBar();
  }

  return renderTopBar();
}

export default withRouter(TopNav);
