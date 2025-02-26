import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import packageJson from "../../package.json";

interface State {
  version: string;
  output: string;
  index: number;
  addText: () => void;
}

const text = "For slamming the keys in frustration. For forcing too many apps at once. For letting the battery drain fully. For leaving liquids nearby. For ignoring temperature alerts. For stacking papers on the device. For neglecting cooling pads. For overloading the CPU. For not cleaning the monitor. For deleting system files accidentally. For leaving on sleep mode for weeks. For overheating during gaming. For overloading the hard drive. For damaging the screen with rough cleaning. For ignoring low storage warnings. For running at max capacity all day. For using pirated software. For careless file downloads that caused harm. For neglecting to dust the vents regularly. For neglecting thermal paste. For yanking cables carelessly. For running untested beta software. For letting dust accumulate inside. For not using a surge protector. For skipping BIOS updates. For ignoring system warnings. For leaving heavy objects on the lid. For pressing Ctrl+Alt+Del without reason. For exposing to unsafe temperatures. For overburdening the GPU. For not using proper cooling systems. For never cleaning the ports. For skipping proper shutdowns. For overheating the components. For not removing malware sooner. For ignoring power-saving features. For damaging the screen with rough cleaning. For running too many tabs. For banging the trackpad. For deleting system files accidentally."

const useStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        version: packageJson.version,
        output: "",
        index: -1,
        addText: () => {
          const { output, index } = get();
          if (index < text.length - 1) {
            set({
              output: output + text[index + 1],
              index: index + 1,
            });
          }else{
            set({index: -1})
          }
        },
      }),
      {
        name: "app",
        storage: createJSONStorage(() => localStorage),
        partialize: () => {},
      }
    ),
    { name: "app" }
  )
);


export default useStore;
