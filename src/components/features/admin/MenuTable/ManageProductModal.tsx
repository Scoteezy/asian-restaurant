'use client'
import { Check, ChevronsUpDown, Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { addProductAction, updateProductAction } from "@/server/actions/products.actions"
import { type ProductWithCategory } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Category } from "@prisma/client"
import { upload } from '@vercel/blob/client';
import Image from "next/image"
import { useRouter } from "next/navigation"
import z from "zod"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Название должно содержать минимум 2 символа.",
  }),
  description: z.string().min(2, {
    message: "Описание должно содержать минимум 2 символа.",
  }),
  spicy: z.boolean(),
  categoryId: z.string(),
  gramm: z.number(),
  nutrition: z.object({
    proteins: z.number().min(0).max(100),
    fats: z.number().min(0).max(100),
    carbohydrates: z.number().min(0).max(100),
    calories: z.number().min(0)
  }).optional(),
  price: z.number(),
  image: z.any().optional(),
})
    
const isSpicyValues = [
  {
    value: true,
    label: "Да",
  },
  {
    value: false,
    label: "Нет",
  },
]
const ManageProductModal = ({categories, product}: {categories: Category[], product?: ProductWithCategory}) => {
  console.log(categories)
  const [open, setOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [categoryPopoverOpen, setCategoryPopoverOpen] = useState(false)
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<null | string>(null);
  const router = useRouter()
  const categoriesValues = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      spicy: product?.isSpicy ?? false,
      categoryId: product?.categoryId ?? "",
      price: product?.price ?? 0,
      gramm: product?.gramm ?? 0,
      image: null,
      nutrition: product?.nutrition ?? {
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        calories: 0
      }
    },
  })
  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();

      formData.append('file', file);
      formData.append('productName', form.getValues('name'));
      formData.append('price', form.getValues('price').toString());
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const data = await response.json() as { url: string };

      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let imageUrl = product?.image ?? '';

      if (values.image instanceof FileList && values.image.length > 0) {
        imageUrl = await handleImageUpload(values.image[0]);
      }

      if (product) {
        await updateProductAction({
          id: product.id,
          name: values.name,
          description: values.description,
          price: values.price,
          gramm: values.gramm,
          categoryId: values.categoryId,
          isSpicy: values.spicy,
          image: imageUrl,
          nutrition: values.nutrition,
        });
      } else {
        await addProductAction({
          name: values.name,
          description: values.description,
          price: values.price,
          gramm: values.gramm,
          categoryId: values.categoryId,
          isSpicy: values.spicy,
          image: imageUrl,
          nutrition: values.nutrition,
        });
      }
        
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  const handleSpicySelect = (value: boolean) => {
    form.setValue('spicy', value)
    setPopoverOpen(false)
  }

  const handleCategorySelect = (value: string) => {
    form.setValue('categoryId', value)
    setCategoryPopoverOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        {product ? (
          <Button variant="outline">
            <Pencil />
          </Button>
        ) : (
          <Button className="w-full"
            variant="outline"
          >
            Добавить позицию
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Редактировать продукт' : 'Добавить продукт'}</DialogTitle>
          <DialogDescription>
            {product ? 'Измените данные продукта' : 'Добавьте новый продукт в меню'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4 "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Вок"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea className="max-h-[250px]"
                      placeholder="Блюда азиатской кухни"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gramm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Граммы</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="330"
                      type="number"
                      {...field}
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4 border-2 border-secondary p-4 rounded-lg">
              <h3 className="font-semibold">Пищевая ценность (на 100г)</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nutrition.proteins"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Белки (г)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          {...field}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nutrition.fats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Жиры (г)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          {...field}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nutrition.carbohydrates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Углеводы (г)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          {...field}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nutrition.calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Калории (ккал)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="number"
                          {...field}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена (₽)</FormLabel>
                  <FormControl>
                    <Input placeholder="100"
                      type="number"
                      {...field}
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full mt-4">
              <p className="text-sm font-medium leading-none mb-2 ">Острота</p>
              <Popover onOpenChange={setPopoverOpen}
                open={popoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={popoverOpen}
                    className="w-full justify-between"
                    role="combobox"
                    variant="outline"
                  >
                    {form.getValues('spicy')
                      ? isSpicyValues.find((spicy) => spicy.value === form.getValues('spicy'))?.label
                      : "Острое блюдо..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start"
                  className="w-full p-0"
                  style={{ width: 'var(--radix-popover-trigger-width)' }}
                >
                  <Command className="w-full ">
                    <CommandInput placeholder="Острота..." />
                    <CommandList>
                      <CommandEmpty>Нет такого варианта.</CommandEmpty>
                      <CommandGroup>
                        {isSpicyValues.map((spicy) => (
                          <CommandItem
                            key={spicy.label}
                            onSelect={() => handleSpicySelect(spicy.value)}
                            value={spicy.value.toString()}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                form.getValues('spicy') === spicy.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {spicy.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full mt-4">
              <p className="text-sm font-medium leading-none mb-2 ">Категория</p>
              <Popover onOpenChange={setCategoryPopoverOpen}
                open={categoryPopoverOpen}
                
              >
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={categoryPopoverOpen}
                    className="w-full justify-between"
                    role="combobox"
                    variant="outline"
                  >
                    {form.getValues('categoryId')
                      ? categories.find((category) => category.id === form.getValues('categoryId'))?.name
                      : "Выбрать категорию..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start"
                  className="w-full p-0"
                  style={{ width: 'var(--radix-popover-trigger-width)' }}
                >
                  <Command className="w-full">
                    <CommandInput placeholder="Категория..." />
                    <CommandList>
                      <CommandEmpty>Нет такого варианта.</CommandEmpty>
                      <CommandGroup>
                        {categoriesValues.map((category) => (
                          <CommandItem
                            key={category.label}
                            onSelect={() => handleCategorySelect(category.value)}
                            value={category.value}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                form.getValues('categoryId') === category.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Изображение</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        accept="image/*"
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleImageChange(e);
                        }}
                        type="file"
                        {...field}
                      />
                      {imagePreview && (
                        <div className="relative w-full h-48">
                          <Image
                            alt="Preview"
                            className="object-cover rounded-md"
                            fill
                            src={imagePreview}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full"
              type="submit"
              variant="secondary"
            >
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export  {ManageProductModal}
