import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";
import { getWallPaper } from "../../api";
import "./index.less";

export default function NotFound() {
  let BASE_URL = "http://cn.bing.com";
  let [src, setSrc] = useState("");

  useEffect(() => {
    getWallPaper().then((res: AxiosResponse) => {
      if (!res) return;
      let { images = [] } = res.data || {};
      let url = (images[0] && images[0].url) || "";
      setSrc(BASE_URL + url);
    });
  }, []);

  return (
    <>
      <div
        className="page page-404"
        style={{
          backgroundImage: `url(${src})`
        }}
      />
      <div className="header header-404 clearfix">
        <TopNav noAffix slotTitle={<h1 className="page-404-title">404</h1>} />
      </div>
    </>
  );
}
