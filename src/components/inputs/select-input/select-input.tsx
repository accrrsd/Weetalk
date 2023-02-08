import { useController } from 'react-hook-form'
import { TSelectableItem } from '../../../utils/types'
import { TSelectWrapperProps } from './types/select-types'
import Select from './select/select'

/**
 *
 * @param control - Принимает в себя control из useForm
 * @param inputName- Имя инпута в форме
 * @param multiple - Несколько значений?
 * @param options - Перечень возможных значений
 * @param rules - Стандартные правила react hook form
 * @param onChange - Функция в которую передается изменения и текущий результат компонента
 * @param clearButton - Нужна кнопка очистки поля?
 * @param divider - Нужно разделение?
 * @param defaultValueIndex - Если нужно стандартное число - сюда передаешь индекс, по умолчанию 0
 * @param className - Принимает в себя ЦЕЛЫЙ STYLE и передает его значения по классам описанным в нем же
 * @param isOpenProp - Булеан, открывает или закрывает компонент из вне.
 * @param returns - Возвращает или массив данных (пустой массив) или конкретную option (undefined)
 */

export function SelectInput({
  control,
  inputName,
  multiple,
  options,
  rules,
  onChange,
  clearButton,
  divider,
  defaultValueIndex = 0,
  className,
  isOpenProp,
}: TSelectWrapperProps) {
  const subRules = { clearButton, divider, isOpenProp, className }
  const { field } = useController({
    defaultValue: options[defaultValueIndex],
    name: inputName,
    control,
    rules,
  })

  const onChangeMultipleFunc = (e: TSelectableItem[]) => {
    field.onChange(e)
    if (multiple && onChange) onChange(e)
  }

  const onChangeSingleFunc = (e: TSelectableItem | undefined) => {
    field.onChange(e)
    if (!multiple && onChange) onChange(e)
  }

  return multiple ? (
    <Select multiple options={options} value={field.value} onChange={onChangeMultipleFunc} ref={field.ref} onBlur={field.onBlur} {...subRules} />
  ) : (
    <Select options={options} value={field.value} onChange={onChangeSingleFunc} ref={field.ref} onBlur={field.onBlur} {...subRules} />
  )
}
