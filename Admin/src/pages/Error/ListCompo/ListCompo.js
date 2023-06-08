import { useEffect, useState } from "react";
import {
  GetComponent,
  UpdateComponent,
} from "../../../apis/components/component";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../../components/Loader/Loading";
import styles from "./ListCompo.module.scss";
import { useForm } from "react-hook-form";

export default function ListCompo() {
  const [loader, setLoader] = useState(true);
  const [components, setComponents] = useState([]);
  const [component, setComponent] = useState();

  const yupSchema = yup.object({
    name: yup.string(),
    codename: yup.string(),
    price: yup.string(),
    date: yup.string(),
    brand: yup.string(),
    socket: yup.string(),
    litho: yup.string(),
    core: yup.string(),
    thread: yup.string(),
    cache: yup.string(),
    clock: yup.string(),
    maxclock: yup.string(),
    bus: yup.string(),
    memory: yup.string(),
    maxMemory: yup.string(),
    bandwithMemory: yup.string(),
    channelMemory: yup.string(),
    ECCMemory: yup.string(),
    itg: yup.string(),
    itgFreq: yup.string(),
    itgMaxFreq: yup.string(),
    itgMaxMem: yup.string(),
    itg4k: yup.string(),
    tdp: yup.string(),
    maxTemp: yup.string(),
  });

  const defaultValues = {
    name: "",
    codename: "",
    price: "",
    date: "",
    brand: "",
    socket: "",
    litho: "",
    core: "",
    thread: "",
    cache: "",
    clock: "",
    maxclock: "",
    bus: "",
    memory: "",
    maxMemory: "",
    bandwithMemory: "",
    channelMemory: "",
    ECCMemory: "",
    itg: "",
    itgFreq: "",
    itgMaxFreq: "",
    itgMaxMem: "",
    itg4k: "",
    tdp: "",
    maxTemp: "",
  };

  const {
    register,
    reset,
    handleSubmit,
    // setError,
    // clearErrors,
    // formState: { errors },
  } = useForm({
    defaultValues,
    values: {
      name: component ? component.ComponentName : null,
      codename: component ? component.CPUcodeName : null,
      price: component ? component.CPUprice : null,
      date: component ? component.CPUreleaseDate : null,
      brand: component ? component.CPUbrand : null,
      socket: component ? component.CPUSockets : null,
      litho: component ? component.CPUlithograph : null,
      core: component ? component.CPUcoreCount : null,
      thread: component ? component.CPUthreadCount : null,
      cache: component ? component.CPUcache : null,
      clock: component ? component.CPUclockSpeed : null,
      maxclock: component ? component.CPUmaxClockSpeed : null,
      bus: component ? component.CPUbus : null,
      memory: component ? component.CPUtypeMemory : null,
      maxMemory: component ? component.CPUmaxMemory : null,
      bandwithMemory: component ? component.CPUmaxMemoryBandwidth : null,
      channelMemory: component ? component.CPUnumberMemoryChannel : null,
      ECCMemory: component ? component.CPUsupportECCMemory : null,
      itg: component ? component.CPUitgdGraphic : null,
      itgFreq: component ? component.CPUitgdGraphicFreq : null,
      itgMaxFreq: component ? component.CPUitgdGraphicMaxFreq : null,
      itgMaxMem: component ? component.CPUitgdGraphicMaxMemory : null,
      itg4k: component ? component.CPUitgdGraphicSupport4K : null,
      tdp: component ? component.CPUmaxTDP : null,
      maxTemp: component ? component.CPUmaxTemp : null,
    },
    resolver: yupResolver(yupSchema),
  });

  //   Get the component
  useEffect(() => {
    setLoader(true);
    async function Component() {
      GetComponent().then((c) => {
        setComponents(c);
        setLoader(false);
      });
    }
    Component();
  }, []);

  //DEBUG
  useEffect(() => {
    console.log(components);
  }, [components]);
  useEffect(() => {
    console.log(component);
  }, [component]);
  //DEBUG

  //   To change between focus of the list to the input
  function handleClick(index) {
    setComponent(components[index]);
    const formContainer = document.getElementById("formContainer");
    formContainer.classList.remove("dnone");
  }
  //   To chnage between focus of the input for the list
  function handleClickCancel() {
    setComponent();
    const formContainer = document.getElementById("formContainer");
    formContainer.classList.add("dnone");
  }

  //   SUBMIT
  async function submit(values) {
    console.log(values);
    // If the input have the same value as the components
    if (
      component.ComponentName.toString() === values.name.toString() &&
      component.CPUcodeName.toString() === values.codename.toString() &&
      component.CPUprice.toString() === values.price.toString() &&
      component.CPUreleaseDate.toString() === values.date.toString() &&
      component.CPUbrand.toString() === values.brand.toString() &&
      component.CPUSockets.toString() === values.socket.toString() &&
      component.CPUlithograph.toString() === values.litho.toString() &&
      component.CPUcoreCount.toString() === values.core.toString() &&
      component.CPUthreadCount.toString() === values.thread.toString() &&
      component.CPUcache.toString() === values.cache.toString() &&
      component.CPUclockSpeed.toString() === values.clock.toString() &&
      component.CPUmaxClockSpeed.toString() === values.maxclock.toString() &&
      component.CPUbus.toString() === values.bus.toString() &&
      component.CPUtypeMemory.toString() === values.memory.toString() &&
      component.CPUmaxMemory.toString() === values.maxMemory.toString() &&
      component.CPUmaxMemoryBandwidth.toString() ===
        values.bandwithMemory.toString() &&
      component.CPUsupportECCMemory.toString() ===
        values.ECCMemory.toString() &&
      component.CPUitgdGraphic.toString() === values.itg.toString() &&
      component.CPUitgdGraphicFreq.toString() === values.itgFreq.toString() &&
      component.CPUitgdGraphicMaxFreq.toString() ===
        values.itgMaxFreq.toString() &&
      component.CPUitgdGraphicSupport4K.toString() ===
        values.itg4k.toString() &&
      component.CPUmaxTDP.toString() === values.tdp.toString() &&
      component.CPUmaxTemp.toString() === values.maxTemp.toString()
    ) {
    } else {
      const NewComponent = values;
      NewComponent.idComponent = component.idComponent;
      UpdateComponent(NewComponent);
      window.location.reload();
    }
    console.log(component);
  }

  return (
    <>
      {loader ? (
        <div className={`${styles.Loading}`}>
          <Loading />
        </div>
      ) : (
        <>
          <div id="list">
            <h2>ListCompo</h2>
            {components ? (
              <>
                <ul className={`d-flex flex-column ${styles.ListContainer}`}>
                  {components.map((c, i) => (
                    <li key={c.idComponent} className="d-flex flex-fill my20">
                      <img
                        className="mx10"
                        src={c.ComponentImage}
                        alt={c.idComponent}
                      />
                      <ul className="d-flex flex-fill flex-column">
                        <li>Id : {c.idCPU}</li>
                        <li>Name : {c.ComponentName}</li>
                        <li>CodeName : {c.CPUcodeName}</li>
                        <li>Price : {c.CPUprice}</li>
                        <li>Date : {c.CPUreleaseDate}</li>
                        <li>Brand : {c.CPUbrand}</li>
                        <li>Socket : {c.CPUSockets}</li>
                        <li>Lithographie : {c.CPUlithograph}</li>
                        <li>CoreCount : {c.CPUcoreCount}</li>
                        <li>Thread Count: {c.CPUthreadCount}</li>
                        <li>Cache : {c.CPUcache}</li>
                        <li>ClockSpeed : {c.CPUclockSpeed}</li>
                        <li>Max clockSpeed : {c.CPUmaxClockSpeed}</li>
                        <li>bus : {c.CPUbus}</li>
                        <li>Memory Type: {c.CPUtypeMemory}</li>
                        <li>Max Memory : {c.CPUmaxMemory}</li>
                        <li>Memory Bandwith: {c.CPUmaxMemoryBandwidth}</li>
                        <li>
                          Number of Memory Channel: {c.CPUnumberMemoryChannel}
                        </li>
                        <li> Support ECC memory: {c.CPUsupportECCMemory}</li>
                        <li>IntegratedGraphic : {c.CPUitgdGraphic}</li>
                        <li>IntegratedGraphic Freq : {c.CPUitgdGraphicFreq}</li>
                        <li>
                          IntegratedGraphic Max Freq : {c.CPUitgdGraphicMaxFreq}
                        </li>
                        <li>
                          IntegratedGraphic Max Memory :{" "}
                          {c.CPUitgdGraphicMaxMemory}
                        </li>
                        <li>
                          IntegratedGraphic 4k support :{" "}
                          {c.CPUitgdGraphicSupport4K}
                        </li>
                        <li>TDP: {c.CPUmaxTDP}</li>
                        <li>Max Temp: {c.CPUmaxTemp}</li>
                      </ul>
                      <button
                        className="mx10"
                        type="button"
                        onClick={() => handleClick(i)}
                      >
                        Edit
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>Pas de components</>
            )}
          </div>
          <div className={`${styles.FormContainer} dnone`} id="formContainer">
            <div
              id="form"
              className={`${styles.Insert} d-flex flex-column justify-content-center align-items-center`}
            >
              <form onSubmit={handleSubmit(submit)}>
                <div>
                  <img />
                  <h2>Id : hfidhfidh</h2>
                </div>
                <div
                  className={`d-flex justify-content-center align-items-center`}
                >
                  <div className="d-flex flex-column">
                    <label>Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      defaultValue={component ? component.ComponentName : null}
                    ></input>
                    <label>CodeName</label>
                    <input
                      type="text"
                      {...register("codename")}
                      defaultValue={component ? component.CPUcodeName : null}
                    ></input>
                    <label>Price</label>
                    <input
                      type="text"
                      {...register("price")}
                      defaultValue={component ? component.CPUprice : null}
                    ></input>
                    <label>Date</label>
                    <input
                      type="text"
                      {...register("date")}
                      defaultValue={component ? component.CPUreleaseDate : null}
                    ></input>
                    <label>Brand</label>
                    <input
                      type="text"
                      {...register("brand")}
                      defaultValue={component ? component.CPUbrand : null}
                    ></input>
                    <label>Socket</label>
                    <input
                      type="text"
                      {...register("socket")}
                      defaultValue={component ? component.CPUSockets : null}
                    ></input>
                    <label>Lithoragphie</label>
                    <input
                      type="text"
                      {...register("litho")}
                      defaultValue={component ? component.CPUlithograph : null}
                    ></input>
                    <label>CoreCount</label>
                    <input
                      type="text"
                      {...register("core")}
                      defaultValue={component ? component.CPUcoreCount : null}
                    ></input>
                    <label>ThreadCount</label>
                    <input
                      type="text"
                      {...register("thread")}
                      defaultValue={component ? component.CPUthreadCount : null}
                    ></input>
                    <label>Cache</label>
                    <input
                      type="text"
                      {...register("cache")}
                      defaultValue={component ? component.CPUcache : null}
                    ></input>
                    <label>ClockSpeed</label>
                    <input
                      type="text"
                      {...register("clock")}
                      defaultValue={component ? component.CPUclockSpeed : null}
                    ></input>
                    <label>Max ClockSpeed</label>
                    <input
                      type="text"
                      {...register("maxclock")}
                      defaultValue={
                        component ? component.CPUmaxClockSpeed : null
                      }
                    ></input>
                    <label>Bus</label>
                    <input
                      type="text"
                      {...register("bus")}
                      defaultValue={component ? component.CPUbus : null}
                    ></input>
                  </div>
                  <div className="d-flex flex-column mx10">
                    <label>Memory Type</label>
                    <input
                      type="text"
                      {...register("memory")}
                      defaultValue={component ? component.CPUtypeMemory : null}
                    ></input>
                    <label>Max Memory</label>
                    <input
                      type="text"
                      {...register("maxMemory")}
                      defaultValue={component ? component.CPUmaxMemory : null}
                    ></input>
                    <label>Memory Bandwith</label>
                    <input
                      type="text"
                      {...register("bandwithMemory")}
                      defaultValue={
                        component ? component.CPUmaxMemoryBandwidth : null
                      }
                    ></input>
                    <label>Number of Memory Channel</label>
                    <input
                      type="text"
                      {...register("channelMemory")}
                      defaultValue={
                        component ? component.CPUnumberMemoryChannel : null
                      }
                    ></input>
                    <label>Support ECC memory</label>
                    <input
                      type="text"
                      {...register("ECCMemory")}
                      defaultValue={
                        component ? component.CPUsupportECCMemory : null
                      }
                    ></input>
                    <label>Integraded Graphic</label>
                    <input
                      type="text"
                      {...register("itg")}
                      defaultValue={component ? component.CPUitgdGraphic : null}
                    ></input>
                    <label>Integraded Graphic Freq</label>
                    <input
                      type="text"
                      {...register("itgFreq")}
                      defaultValue={
                        component ? component.CPUitgdGraphicFreq : null
                      }
                    ></input>
                    <label>Integraded Graphic Max Freq</label>
                    <input
                      type="text"
                      {...register("itgMaxFreq")}
                      defaultValue={
                        component ? component.CPUitgdGraphicFreq : null
                      }
                    ></input>
                    <label>Integraded Graphic Max memory</label>
                    <input
                      type="text"
                      {...register("itgMaxMem")}
                      defaultValue={
                        component ? component.CPUitgdGraphicMaxMemory : null
                      }
                    ></input>
                    <label>Integraded Graphic 4k support </label>
                    <input
                      type="text"
                      {...register("itg4k")}
                      defaultValue={
                        component ? component.CPUitgdGraphicSupport4K : null
                      }
                    ></input>
                    <label>TDP</label>
                    <input
                      type="text"
                      {...register("tdp")}
                      defaultValue={component ? component.CPUmaxTDP : null}
                    ></input>
                    <label>Max Temp</label>
                    <input
                      type="text"
                      {...register("maxTemp")}
                      defaultValue={component ? component.CPUmaxTemp : null}
                    ></input>
                  </div>
                </div>
                <div className="d-flex flex-content-end">
                  <button type="button" onClick={handleClickCancel}>
                    Cancel
                  </button>
                  <button>Save</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
