import { useRef } from "react"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useDebouncedCallback } from "use-debounce"

import { Radio } from "@/components/Radio"
import { TextInput } from "@/components/TextInput"
import { Technology } from "@/constants"
import { useFilterStore } from "@/store/filter"

import { inputDebounceTime, testIds } from "./Filter.constants"
import styles from './Filter.module.css'



export function Filter() {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    technology,
    setTechnology,
    input,
    setInput
  } = useFilterStore()

  const handleInputChange = useDebouncedCallback(setInput, inputDebounceTime)

  return (
    <div className={styles.container}>
      <TextInput.Root className={styles.input}>
        <MagnifyingGlass />
        <TextInput.Input
          name="search"
          ref={inputRef}
          defaultValue={input}
          placeholder="Find a repository"
          onChange={(event) => handleInputChange(event.target.value)}
          data-testid={testIds.input}
        />
      </TextInput.Root>

      <Radio.Group
        value={technology}
        onValueChange={(value) => setTechnology(value as Technology)}
      >
        {Object.values(Technology).map(item => (
          <Radio.Item
            key={item}
            value={item}
            className={styles.radio_item}
          >
            {item}
          </Radio.Item>
        ))}
      </Radio.Group>
    </div>
  )
}
