import { useEffect, useState } from "react";
import {
  CreateComponent,
  DeleteComponent,
  GetComponent,
  UpdateComponent,
} from "../../apis/components/component";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../components/Loader/Loading";
import styles from "./ListCompo.module.scss";
import "./ListCompo.scss";
import { useForm } from "react-hook-form";

export default function ListCompo() {
  const [loader, setLoader] = useState(true);
  // List of components
  const [components, setComponents] = useState([]);
  // Component selected
  const [component, setComponent] = useState();
  // To know if we create or edit component
  const [create, setCreate] = useState(false);
  // Sorting object
  const [sorting, setSorting] = useState({
    idCPU: true,
    ComponentName: null,
    CPUcodeName: null,
    CPUprice: null,
    CPUreleaseDate: null,
    CPUbrand: null,
    CPUSockets: null,
    CPUlithograph: null,
    CPUcoreCount: null,
    CPUthreadCount: null,
    CPUcache: null,
    CPUclockSpeed: null,
    CPUmaxClockSpeed: null,
    CPUbus: null,
    CPUtypeMemory: null,
    CPUmaxMemory: null,
    CPUmaxMemoryBandwidth: null,
    CPUnumberMemoryChannel: null,
    CPUsupportECCMemory: null,
    CPUitgdGraphic: null,
    CPUitgdGraphicFreq: null,
    CPUitgdGraphicMaxFreq: null,
    CPUitgdGraphicMaxMemory: null,
    CPUitgdGraphicSupport4K: null,
    CPUmaxTDP: null,
    CPUmaxTemp: null,
  });

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

  const { register, handleSubmit } = useForm({
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

  useEffect(() => {
    console.log(sorting);
    // Sort alphabeticly ascending the component with given parameter
    function sortAlphaAsc(parameter) {
      setComponents([
        ...components.sort((c, cs) =>
          c[parameter].localeCompare(cs[parameter])
        ),
      ]);
    }
    // Sort alphabeticly descending the component with given parameter
    function sortAlphaDesc(parameter) {
      setComponents([
        ...components.sort((c, cs) =>
          cs[parameter].localeCompare(c[parameter])
        ),
      ]);
    }
    // Sort number ascending the component with given parameter
    function sortNumbAsc(parameter) {
      let int = false;
      // eslint-disable-next-line
      components.map((c) => {
        if (Number.isInteger(c[parameter])) {
          int = true;
        }
      });
      if (int) {
        setComponents([
          ...components.sort((c, cs) => c[parameter] - cs[parameter]),
        ]);
      } else {
        setComponents([
          ...components.sort(
            (c, cs) =>
              parseInt(c[parameter].match(/\d+/)) -
              parseInt(cs[parameter].match(/\d+/))
          ),
        ]);
      }
    }
    // Sort number descending the component with given parameter
    function sortNumbDesc(parameter) {
      let int = false;
      // eslint-disable-next-line
      components.map((c) => {
        if (Number.isInteger(c[parameter])) {
          int = true;
        }
      });
      if (int) {
        setComponents([
          ...components.sort((c, cs) => cs[parameter] - c[parameter]),
        ]);
      } else {
        setComponents([
          ...components.sort(
            (c, cs) =>
              parseInt(cs[parameter].match(/\d+/)) -
              parseInt(c[parameter].match(/\d+/))
          ),
        ]);
      }
    }
    // Get the object sorting and choose how to sort
    Object.keys(sorting).forEach((key) => {
      if (
        [
          "ComponentName",
          "CPUcodeName",
          "CPUbrand",
          "CPUSockets",
          "CPUtypeMemory",
          "CPUitgdGraphic",
        ].includes(key)
      ) {
        if (sorting[key] === true) {
          sortAlphaAsc(key);
        } else if (sorting[key] === false) {
          sortAlphaDesc(key);
        }
      } else {
        if (sorting[key] === true) {
          sortNumbAsc(key);
        } else if (sorting[key] === false) {
          sortNumbDesc(key);
        }
      }
    });
    // eslint-disable-next-line
  }, [sorting]);

  /*FUNCTION TO SORT */
  function SortingObject(keys) {
    const newSorting = Object.keys(sorting).reduce((acc, key) => {
      // Si la clé correspond a la clé clické
      if (key === keys) {
        // Si elle est null je l'initie a true
        if (acc[key] === null) {
          console.log("null");
          acc[key] = true;
          // Sinon j'inverse la valeur
        } else {
          console.log("false/true");
          acc[key] = !sorting[key];
        }
        // Je met tous les autres clé a null
      } else {
        acc[key] = null;
      }
      // Je renvoie le tableau
      return acc;
    }, {});
    // Je renvoie l'objet
    return newSorting;
  }
  function resetAllArrow() {
    const allHeader = document.getElementsByClassName("HeadTab");
    console.log(allHeader);
    const elementArray = Array.from(allHeader);
    elementArray.forEach((header) => {
      header.classList.remove("sorting");
      header.classList.remove("sorting-reverse");
    });
  }

  function setArrow(target, parameter) {
    resetAllArrow();
    if (sorting[parameter] === null) {
      target.classList.add("sorting");
    } else if (sorting[parameter] === false) {
      target.classList.add("sorting");
      target.classList.remove("sorting-reverse");
    } else {
      target.classList.remove("sorting");
      target.classList.add("sorting-reverse");
    }
  }

  // Sort the tab by id
  function sortById(event) {
    setSorting(SortingObject("idCPU"));
    resetAllArrow();
    setArrow(event.target, "idCPU");
  }
  // Sort the tab by name
  function sortByName(event) {
    setSorting(SortingObject("ComponentName"));
    resetAllArrow();
    setArrow(event.target, "ComponentName");
  }
  // Sort the tab by CodeName
  function sortByCodeName(event) {
    setSorting(SortingObject("CPUcodeName"));
    resetAllArrow();
    setArrow(event.target, "CPUcodeName");
  }
  // Sort the tab by Price
  function sortByPrice(event) {
    setSorting(SortingObject("CPUprice"));
    resetAllArrow();
    setArrow(event.target, "CPUprice");
  }
  // Sort the tab by Date
  function sortByDate(event) {
    setSorting(SortingObject("CPUreleaseDate"));
    resetAllArrow();
    setArrow(event.target, "CPUreleaseDate");
  }
  // Sort the tab by Brand
  function sortByBrand(event) {
    setSorting(SortingObject("CPUbrand"));
    resetAllArrow();
    setArrow(event.target, "CPUbrand");
  }
  // Sort the tab by Socket
  function sortBySocket(event) {
    setSorting(SortingObject("CPUSockets"));
    resetAllArrow();
    setArrow(event.target, "CPUSockets");
  }
  // Sort the tab by litho
  function sortByLitho(event) {
    setSorting(SortingObject("CPUlithograph"));
    resetAllArrow();
    setArrow(event.target, "CPUlithograph");
  }
  // Sort the tab by Core count
  function sortByCoreCount(event) {
    setSorting(SortingObject("CPUcoreCount"));
    resetAllArrow();
    setArrow(event.target, "CPUcoreCount");
  }
  // Sort the tab by Thread Count
  function sortByThreadCount(event) {
    setSorting(SortingObject("CPUthreadCount"));
    resetAllArrow();
    setArrow(event.target, "CPUthreadCount");
  }
  // Sort the tab by Cache size
  function sortByCache(event) {
    setSorting(SortingObject("CPUcache"));
    resetAllArrow();
    setArrow(event.target, "CPUcache");
  }
  // Sort the tab by clock speed
  function sortByClockSpeed(event) {
    setSorting(SortingObject("CPUclockSpeed"));
    resetAllArrow();
    setArrow(event.target, "CPUclockSpeed");
  }
  // Sort the tab by Max clock Speed
  function sortByMaxClockSpeed(event) {
    setSorting(SortingObject("CPUmaxClockSpeed"));
    resetAllArrow();
    setArrow(event.target, "CPUmaxClockSpeed");
  }
  // Sort the tab by Bus size
  function sortByBus(event) {
    setSorting(SortingObject("CPUbus"));
    resetAllArrow();
    setArrow(event.target, "CPUbus");
  }
  // Sort the tab by Memory Type
  function sortByMemoryType(event) {
    setSorting(SortingObject("CPUtypeMemory"));
    resetAllArrow();
    setArrow(event.target, "CPUtypeMemory");
  }
  // Sort the tab by Max Memory
  function sortByMaxMem(event) {
    setSorting(SortingObject("CPUmaxMemory"));
    resetAllArrow();
    setArrow(event.target, "CPUmaxMemory");
  }
  // Sort the tab by Memory bandwith
  function sortByMemoryBandwith(event) {
    setSorting(SortingObject("CPUmaxMemoryBandwidth"));
    resetAllArrow();
    setArrow(event.target, "CPUmaxMemoryBandwidth");
  }
  // Sort the tab by Memory Channel
  function sortByMemoryChannel(event) {
    setSorting(SortingObject("CPUnumberMemoryChannel"));
    resetAllArrow();
    setArrow(event.target, "CPUnumberMemoryChannel");
  }
  // Sort the tab by ECC memory support
  function sortByECCMemory(event) {
    setSorting(SortingObject("CPUsupportECCMemory"));
    resetAllArrow();
    setArrow(event.target, "CPUsupportECCMemory");
  }
  // Sort the tab by ITG
  function sortByITG(event) {
    setSorting(SortingObject("CPUitgdGraphic"));
    resetAllArrow();
    setArrow(event.target, "CPUitgdGraphic");
  }
  // Sort the tab by litho
  function sortByITGFreq(event) {
    setSorting(SortingObject("CPUitgdGraphicFreq"));
    resetAllArrow();
    setArrow(event.target, "CPUitgdGraphicFreq");
  }
  // Sort the tab by ITG max frequence
  function sortByITGMaxFreq(event) {
    setSorting(SortingObject("CPUitgdGraphicMaxFreq"));
    resetAllArrow();
    setArrow(event.target, "CPUitgdGraphicMaxFreq");
  }
  // Sort the tab by ITG max memory
  function sortByITGMaxMem(event) {
    setSorting(SortingObject("CPUitgdGraphicMaxMemory"));
    resetAllArrow();
    setArrow(event.target, "CPUitgdGraphicMaxMemory");
  }
  // Sort the tab by ITG4K
  function sortByITG4k(event) {
    setSorting(SortingObject("CPUitgdGraphicSupport4K"));
    resetAllArrow();
    setArrow(event.target, "CPUitgdGraphicSupport4K");
  }
  // Sort the tab by TDP
  function sortByTDP(event) {
    setSorting(SortingObject("CPUmaxTDP"));
    resetAllArrow();
    setArrow(event.target, "CPUmaxTDP");
  }
  // Sort the tab by Temp
  function sortByTemp(event) {
    setSorting(SortingObject("CPUmaxTemp"));
    resetAllArrow();
    setArrow(event.target, "CPUmaxTemp");
  }

  /* FUNCTION  TO HANDLE INPUT */
  //   To change between focus of the list to the input
  function handleClick(index) {
    setComponent(components[index]);
    const formContainer = document.getElementById("formContainer");
    formContainer.classList.remove("dnone");
  }
  //   To chnage between focus of the input for the list
  function handleClickCancel() {
    setComponent();
    setCreate(false);
    const formContainer = document.getElementById("formContainer");
    formContainer.classList.add("dnone");
  }

  // to show a pop up before deleting
  function handleDeletePopUp(index) {
    const PopUp = document.getElementById("PopUp");
    PopUp.classList.remove("dnone");
    setComponent(components[index]);
  }

  // to hide pop up
  function handleDeletePopUpCancel() {
    const PopUp = document.getElementById("PopUp");
    PopUp.classList.add("dnone");
    setComponent("");
  }

  // to delete a component
  function handleDelete() {
    try {
      DeleteComponent(component.idComponent);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  // Handle the click to create a component
  function handleCreateComponant() {
    setCreate(true);
    const formContainer = document.getElementById("formContainer");
    formContainer.classList.remove("dnone");
  }

  //   SUBMIT UPDATE AND CREATE
  async function submit(values) {
    // Dans le cas ou j'édit
    if (!create) {
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
        // Si les deux objet sont les même je ne change rien
      } else {
        // Sinon j'update
        try {
          const NewComponent = values;
          NewComponent.idComponent = component.idComponent;
          UpdateComponent(NewComponent);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      }
      // Dans le case ou je crée
    } else {
      try {
        const NewComponent = values;
        CreateComponent(NewComponent);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      {loader ? (
        <div className={`${styles.Loading}`}>
          <Loading />
        </div>
      ) : (
        <>
          <div
            id="list"
            className={`flex-column justify-content-center ${styles.ParentContainer}`}
          >
            <button
              className="btn btn-primary-reverse"
              onClick={handleCreateComponant}
            >
              CREATE COMPONENT
            </button>
            {/* Components affichage */}
            {components ? (
              <>
                <div className={`dblock ${styles.ListContainer}`}>
                  {/* Base du table */}
                  <div className="d-flex parent">
                    <div className="W100 HeadTab mx10">Image</div>
                    <div className="W100 HeadTab sorting" onClick={sortById}>
                      Id
                    </div>
                    <div className="W100 HeadTab" onClick={sortByName}>
                      Name
                    </div>
                    <div className="W100 HeadTab" onClick={sortByCodeName}>
                      CodeName
                    </div>
                    <div className="W100 HeadTab" onClick={sortByPrice}>
                      Price
                    </div>
                    <div className="W100 HeadTab" onClick={sortByDate}>
                      Date
                    </div>
                    <div className="W100 HeadTab" onClick={sortByBrand}>
                      Brand
                    </div>
                    <div className="W100 HeadTab" onClick={sortBySocket}>
                      Socket
                    </div>
                    <div className="W100 HeadTab" onClick={sortByLitho}>
                      Lithographie
                    </div>
                    <div className="W100 HeadTab" onClick={sortByCoreCount}>
                      CoreCount
                    </div>
                    <div className="W100 HeadTab" onClick={sortByThreadCount}>
                      ThreadCount
                    </div>
                    <div className="W100 HeadTab" onClick={sortByCache}>
                      Cache
                    </div>
                    <div className="W100 HeadTab" onClick={sortByClockSpeed}>
                      ClockSpeed
                    </div>
                    <div className="W150 HeadTab" onClick={sortByMaxClockSpeed}>
                      MaxClockSpeed
                    </div>
                    <div className="W100 HeadTab" onCanPlay={sortByBus}>
                      Bus
                    </div>
                    <div className="W100 HeadTab" onClick={sortByMemoryType}>
                      Memory Type
                    </div>
                    <div className="W100 HeadTab" onClick={sortByMaxMem}>
                      Max Memory
                    </div>
                    <div
                      className="W100 HeadTab"
                      onClick={sortByMemoryBandwith}
                    >
                      Memory BandWith
                    </div>
                    <div className="W100 HeadTab" onClick={sortByMemoryChannel}>
                      Number of Memory Channel
                    </div>
                    <div className="W100 HeadTab" onClick={sortByECCMemory}>
                      Support ECC Memory
                    </div>
                    <div className="W150 HeadTab" onClick={sortByITG}>
                      IntegratedGraphic
                    </div>
                    <div className="W150 HeadTab" onClick={sortByITGFreq}>
                      IntegratedGraphic Freq
                    </div>
                    <div className="W150 HeadTab" onClick={sortByITGMaxFreq}>
                      IntegratedGraphic Max Freq
                    </div>
                    <div className="W150 HeadTab" onClick={sortByITGMaxMem}>
                      IntegratedGraphic Max Memory
                    </div>
                    <div className="W150 HeadTab" onClick={sortByITG4k}>
                      IntegratedGraphic 4k support
                    </div>
                    <div className="W100 HeadTab" onClick={sortByTDP}>
                      TDP
                    </div>
                    <div className="W100 HeadTab" onClick={sortByTemp}>
                      Max Temp
                    </div>
                  </div>
                  <div className="">
                    {/* Liste of all the spec */}
                    {components.map((c, i) => (
                      <div className="dblock parent" key={c.idComponent}>
                        <div className="W100 mx10">
                          <img src={c.ComponentImage} alt={c.idComponent} />
                        </div>
                        <div className="W100">{c.idCPU}</div>
                        <div className="W100">{c.ComponentName}</div>
                        <div className="W100">{c.CPUcodeName}</div>
                        <div className="W100">{c.CPUprice}</div>
                        <div className="W100">{c.CPUreleaseDate}</div>
                        <div className="W100">{c.CPUbrand}</div>
                        <div className="W100">{c.CPUSockets}</div>
                        <div className="W100">{c.CPUlithograph}</div>
                        <div className="W100">{c.CPUcoreCount}</div>
                        <div className="W100">{c.CPUthreadCount}</div>
                        <div className="W100">{c.CPUcache}</div>
                        <div className="W100">{c.CPUclockSpeed}</div>
                        <div className="W150">{c.CPUmaxClockSpeed}</div>
                        <div className="W100">{c.CPUbus}</div>
                        <div className="W100">{c.CPUtypeMemory}</div>
                        <div className="W100">{c.CPUmaxMemory}</div>
                        <div className="W100">{c.CPUmaxMemoryBandwidth}</div>
                        <div className="W100">{c.CPUnumberMemoryChannel}</div>
                        <div className="W100">{c.CPUsupportECCMemory}</div>
                        <div className="W150">{c.CPUitgdGraphic}</div>
                        <div className="W150">{c.CPUitgdGraphicFreq}</div>
                        <div className="W150">{c.CPUitgdGraphicMaxFreq}</div>
                        <div className="W150">{c.CPUitgdGraphicMaxMemory}</div>
                        <div className="W150">{c.CPUitgdGraphicSupport4K}</div>
                        <div className="W100">{c.CPUmaxTDP}</div>
                        <div className="W100">{c.CPUmaxTemp}</div>
                        <div className="buttonContainer d-flex">
                          <button
                            className="btn btn-primary mx10"
                            type="button"
                            onClick={() => handleClick(i)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-error mx10"
                            type="button"
                            onClick={() => handleDeletePopUp(i)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>Pas de components</>
            )}
          </div>
          {/* Form for create and edit */}
          <div className={`${styles.FormContainer} dnone`} id="formContainer">
            <div
              id="form"
              className={`${styles.Insert} d-flex flex-column justify-content-center align-items-center p10`}
            >
              <form onSubmit={handleSubmit(submit)}>
                <div>
                  <img
                    src={component ? component.ComponentImage : null}
                    alt={component ? component.idCPU : null}
                  />
                  {create ? (
                    <h2>Create a component</h2>
                  ) : (
                    <h2>
                      Id : {component ? component.idCPU : null}/ Id Component :
                      {component ? component.idComponent : null}
                    </h2>
                  )}
                </div>
                <div
                  className={`d-flex justify-content-center align-items-center`}
                >
                  {/* Input Field 1 */}
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
                  {/* Input Field 2 */}
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
                <div className="d-flex justify-content-end m10">
                  <button
                    type="button"
                    className="btn btn-primary-reverse mx10"
                    onClick={handleClickCancel}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary mx10">Save</button>
                </div>
              </form>
            </div>
          </div>
          {/* PopUp to be sure to delete */}
          <div id="PopUp" className={`${styles.PopUpContainer} dnone`}>
            <div className={`d-flex flex-column p10 ${styles.PopUpDelete}`}>
              <h2>
                Are you sure you want to delete{" "}
                {component
                  ? "ID : " + component.idCPU + "/" + component.ComponentName
                  : null}{" "}
                ?
              </h2>
              <div className="d-flex justify-content-end m10">
                <button
                  className="btn btn-primary-reverse mx10"
                  onClick={handleDeletePopUpCancel}
                >
                  Cancel
                </button>
                <button className="btn btn-error mx10" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
