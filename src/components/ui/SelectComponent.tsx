"use client";

import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import Image from "next/image";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

type CustomSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { id: string; label: string }[];
  isLoading?: boolean;
  selectedValues?: string[];
  placeholder?: string;
  error?: string;
  image: string;
};

export default function SelectComponent<T extends FieldValues>({
  name,
  control,
  label,
  options,
  isLoading,
  selectedValues = [],
  placeholder = "Select",
  error,
  image,
}: CustomSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative w-full">
          <Select
            key={name}
            className="w-full"
            label={
              <div className="flex items-center gap-x-10">
                <div className="relative size-[50px]">
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            }
            isInvalid={!!error}
            size="lg"
            isLoading={isLoading}
            labelPlacement="outside-left"
            placeholder={placeholder}
            selectedKeys={field.value ? [String(field.value)] : []}
            onSelectionChange={(selected) =>
              field.onChange(Array.from(selected)[0])
            }
          >
            {options.map((option) => (
              <SelectItem
                key={String(option.id)}
                isDisabled={
                  selectedValues.includes(option.id) &&
                  option.id !== String(field.value)
                }
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>

          {field.value && (
            <Button
              isIconOnly
              variant="faded"
              className="absolute right-[5px] top-[5px]"
              onPress={() => field.onChange()}
            >
              <IoMdClose size={18} />
            </Button>
          )}
        </div>
      )}
    />
  );
}
