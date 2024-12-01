import { useState } from "react"
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillFactory,
  PillsInput,
  StylesApiProps,
  useCombobox,
} from "@mantine/core"

interface MultiSelectProps<T> {
  value: string[] | null
  data: (T & { label: string; value: string })[]
  pillStyle: (item: T) => StylesApiProps<PillFactory>["styles"]
  itemComponent: (item: T) => React.ReactNode
  onChange: (value: string[]) => void
}

export function SearchableMultiSelect<T>(props: MultiSelectProps<T>) {
  const { itemComponent, pillStyle, data } = props
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  })
  const value = props.value ?? []
  const onChange = props.onChange
  const indexedData: Record<string, T & { label: string; value: string }> = {}
  data.forEach((item) => {
    indexedData[item.value] = item
  })

  const [search, setSearch] = useState("")

  const handleValueSelect = (val: string) => {
    const newValue = value.includes(val)
      ? value.filter((v) => v !== val)
      : [...value, val]
    onChange(newValue)
  }

  const handleValueRemove = (val: string) => {
    const newValue = value.filter((v) => v !== val)
    onChange(newValue)
  }

  const values = value.map((item) => (
    <Pill
      styles={pillStyle(indexedData[item])}
      key={item}
      withRemoveButton
      onRemove={() => handleValueRemove(item)}
    >
      {indexedData[item].label}
    </Pill>
  ))

  const options = data
    .filter((item) =>
      item.label.toLowerCase().includes(search.trim().toLowerCase())
    )
    .map((item) => (
      <Combobox.Option
        value={item.value}
        key={item.value}
        active={value.includes(item.value)}
      >
        <Group gap="sm">
          {value.includes(item.value) ? <CheckIcon size={12} /> : null}
          <span>{itemComponent(item)}</span>
        </Group>
      </Combobox.Option>
    ))

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput
          onClick={() => combobox.openDropdown()}
          label="タグ"
          required
        >
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="タグ選択"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex()
                  setSearch(event.currentTarget.value)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault()
                    handleValueRemove(value[value.length - 1])
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found...</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
