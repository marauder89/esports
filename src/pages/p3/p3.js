import { useRef, useEffect, useState, useCallback, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Slider } from "@mui/material";

import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import FastForwardIcon from "@mui/icons-material/FastForward";
import IconButton from "@mui/material/IconButton";

import { GameVodPopup, EventComponent, TimeLine } from "../../components";
import { eventListState, eventListSelector } from "../../store";
import { GPG_1_1, GPG_1_2, GPG_1_3 } from "../../services";

const P3 = () => {
  const [tierList, setTierList] = useState([{ name: "None", value: "" }]);
  const [profilesData, setProfilesData] = useState([]);
  const [play, setPlay] = useState(false);
  const { register, handleSubmit, setFocus } = useForm();

  const versionList = [
    { name: "None", value: "" },
    { name: "11.13", value: 11.13 },
    { name: "11.14", value: 11.14 },
    { name: "11.15", value: 11.15 },
    { name: "11.16", value: 11.16 },
    { name: "11.17", value: 11.17 },
    { name: "11.18", value: 11.18 },
  ];

  useEffect(() => {
    setFocus("version");
  }, [setFocus]);

  const onSubmit = useCallback((form) => {
    const getGPG_1_2 = async () => {
      const _profilesData = await GPG_1_2(form);
      setProfilesData(_profilesData.profiles);
    };
    getGPG_1_2();
  }, []);

  const onError = useCallback((errors, e) => {
    const field = Object.keys(errors)[0];
    alert(errors[field].message);
  }, []);

  const onPlayBoxClick = useCallback((value) => {
    if (value === "play") {
      setPlay(true);
    } else if (value === "pause") {
      setPlay(false);
    }
  }, []);

  const onSliderChange = useCallback((e, value) => {
    console.log(value);
  }, []);

  const sliderValueFormatter = useCallback((value) => {
    return `${value} test`;
  }, []);

  const onChangeVersion = useCallback((el) => {
    const selected = el.target.value;

    if (selected === "") {
      setTierList([{ name: "None", value: "" }]);
    } else {
      const getGPG_1_1 = async () => {
        const params = {
          version: selected,
        };
        const _tierList = await GPG_1_1(params);
        setTierList([
          { name: "None", value: "" },
          ..._tierList.tier.map((tier) => {
            return { name: tier, value: tier };
          }),
        ]);
      };
      getGPG_1_1();
    }
  }, []);

  return (
    <Fragment>
      <section>
        <div className="container p-0">
          <div className="row equal-cols">
            <div className="col-md-6">
              <div className="mapDataList m-3 p-4 rounded bg border">
                <div className="mapSelect">
                  <label htmlFor="groupSelect">Group</label>
                  <select className="form-select" defaultValue={""} disabled={profilesData.length < 1}>
                    {profilesData.map((profile, index) => {
                      return (
                        <option key={index} value={profile.name} selected={index === 3}>
                          {profile.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mapMove mt-3">
                  <img src="images/groupMap.jpg" />
                  <Slider
                    defaultValue={0}
                    step={5}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    getAriaValueText={sliderValueFormatter}
                    valueLabelFormat={sliderValueFormatter}
                    onChange={onSliderChange}
                    disabled={profilesData.length < 1}
                  />
                  <div className="play-box">
                    <IconButton aria-label="fastRewindIcon" onClick={() => onPlayBoxClick("fastRewind")} disabled={profilesData.length < 1}>
                      <FastRewindIcon color={profilesData.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                    <IconButton aria-label="playIcon" onClick={() => onPlayBoxClick("play")} hidden={play} disabled={profilesData.length < 1}>
                      <PlayArrowIcon color={profilesData.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                    <IconButton aria-label="pauseIcon" onClick={() => onPlayBoxClick("pause")} hidden={!play} disabled={profilesData.length < 1}>
                      <PauseIcon color={profilesData.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                    <IconButton aria-label="stopIcon" onClick={() => onPlayBoxClick("stop")} disabled={profilesData.length < 1}>
                      <StopIcon color={profilesData.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                    <IconButton aria-label="fastForwardIcon" onClick={() => onPlayBoxClick("fastForward")} disabled={profilesData.length < 1}>
                      <FastForwardIcon color={profilesData.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                  </div>
                </div>
                <div className="mapData mt-3 scrollBar">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Group</th>
                        <th scope="col">Kill</th>
                        <th scope="col">Death</th>
                        <th scope="col">CS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">A</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">B</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">C</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">C</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">C</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">C</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">C</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">C</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">C</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                      <tr>
                        <th scope="row">C</th>
                        <td>5.7</td>
                        <td>2.3</td>
                        <td>15.6</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mapSearch m-3 p-4 rounded bg border">
                <div className="searchForm">
                  <form>
                    <div className="searchSelect">
                      <label htmlFor="tearSelect">Tear</label>
                      <select className="form-select" defaultValue={""} {...register("tier", { required: "티어를 선택해 주세요." })}>
                        {tierList.map((tier, index) => {
                          return (
                            <option key={index} value={tier.value}>
                              {tier.name}
                            </option>
                          );
                        })}
                      </select>
                      <label htmlFor="versionSelect">Version</label>
                      <select className="form-select" defaultValue={""} {...register("version", { required: "버전을 선택해 주세요.", onChange: onChangeVersion })}>
                        {versionList.map((version, index) => {
                          return (
                            <option key={index} value={version.value}>
                              {version.name}
                            </option>
                          );
                        })}
                      </select>
                      <button type="button" className="btn btn_blue2" onClick={handleSubmit(onSubmit, onError)}>
                        프로파일분류
                      </button>
                    </div>
                    <div className="searchRadio mt-3">
                      <div className="teamGroup">
                        <span className="">Team</span>
                        <input type="radio" className="btn-check" name="team" id="option1" {...register("team", { required: true })} autoComplete="off" defaultValue={"blue"} defaultChecked />
                        <label className="btn btn-secondary" htmlFor="option1">
                          Blue
                        </label>
                        <input type="radio" className="btn-check" name="team" id="option2" {...register("team", { required: true })} autoComplete="off" defaultValue={"purple"} />
                        <label className="btn btn-secondary btn-right" htmlFor="option2">
                          Purple
                        </label>
                      </div>
                      <div className="positionGroup">
                        <span className="">Position</span>
                        <input
                          type="radio"
                          className="btn-check"
                          name="position"
                          id="option3"
                          {...register("position", { required: true })}
                          autoComplete="off"
                          defaultValue={"jungle"}
                          defaultChecked
                        />
                        <label className="btn btn-secondary" htmlFor="option3">
                          Jungle
                        </label>
                        <input type="radio" className="btn-check" name="position" id="option4" {...register("position", { required: true })} autoComplete="off" defaultValue={"middle"} />
                        <label className="btn btn-secondary btn-right" htmlFor="option4">
                          Middle
                        </label>
                      </div>
                      <div className="featureGroup">
                        <span className="">Feature</span>
                        <input
                          type="radio"
                          className="btn-check"
                          name="feature"
                          id="option5"
                          {...register("feature", { required: true })}
                          autoComplete="off"
                          defaultValue={"win_rate"}
                          defaultChecked
                        />
                        <label className="btn btn-secondary" htmlFor="option5">
                          Win rate
                        </label>
                        <input type="radio" className="btn-check" name="feature" id="option6" {...register("feature", { required: true })} autoComplete="off" defaultValue={"kda"} />
                        <label className="btn btn-secondary btn-right" htmlFor="option6">
                          K/D/A
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
                <hr />
                <div className="resultMap">
                  <ul>
                    <li>
                      <p>Group A</p>
                      <div className="mapBox">
                        <div className="movement">
                          <img src="images/movement1.png" />
                        </div>
                        <div className="mapSmall">
                          <img src="images/resultMapSmall.png" />
                        </div>
                      </div>
                    </li>
                    <li>
                      <p>Group B</p>
                      <div className="mapBox">
                        <div className="movement">
                          <img src="images/movement2.png" />
                        </div>
                        <div className="mapSmall">
                          <img src="images/resultMapSmall.png" />
                        </div>
                      </div>
                    </li>
                    <li>
                      <p>Group C</p>
                      <div className="mapBox">
                        <div className="movement">
                          <img src="images/movement3.png" />
                        </div>
                        <div className="mapSmall">
                          <img src="images/resultMapSmall.png" />
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>Group A</p>
                      <div className="mapBox">
                        <div className="movement">
                          <img src="images/movement1.png" />
                        </div>
                        <div className="mapSmall">
                          <img src="images/resultMapSmall.png" />
                        </div>
                      </div>
                    </li>
                    <li>
                      <p>Group B</p>
                      <div className="mapBox">
                        <div className="movement">
                          <img src="images/movement2.png" />
                        </div>
                        <div className="mapSmall">
                          <img src="images/resultMapSmall.png" />
                        </div>
                      </div>
                    </li>
                    <li>
                      <p>Group C</p>
                      <div className="mapBox">
                        <div className="movement">
                          <img src="images/movement3.png" />
                        </div>
                        <div className="mapSmall">
                          <img src="images/resultMapSmall.png" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default P3;
