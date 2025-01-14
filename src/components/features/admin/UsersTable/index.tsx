
"use client"
import { Pencil } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { updateUserRoleAction } from "@/server/actions/user.actions";
import { type Role, type User } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils"
const roles = [
  {
    value: "ADMIN",
    label: "Администратор",
  },
  {
    value: "USER",
    label: "Пользователь",
  },
  {
    value: "STAFF",
    label: "Сотрудник",
  },
  
]
const UsersTable = ({users, adminUser}: {users: User[], adminUser: User}) => {

  return (
    <>
      <Table>
        <TableCaption>Список всех пользователей.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Дата регистрации</TableHead>
            <TableHead>Телефон</TableHead>

            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{roles.find((role) => role.value === user.role)?.label}</TableCell>
              <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell className="text-right">
                <UserDialog adminUser={adminUser}
                  user={user}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </>
  )
};

export default UsersTable;


function UserDialog({user, adminUser}: {user: User, adminUser: User}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(user.role)
  const router = useRouter()
  const handleSave = async () => {
    if(user.id === adminUser.id) {
      toast({
        title: "Вы не можете изменить свою роль",
        description: "Вы не можете изменять свою роль",
      })
      return
    }
    
    await updateUserRoleAction(user.id, value)
    toast({
      title: "Роль пользователя была успешно изменена",
      description: "Роль пользователя была успешно изменена",
    })
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование пользователя</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Вы можете изменить данные пользователя
        </DialogDescription>
        <div>
          <Popover onOpenChange={setOpen}
            open={open}
          >
            <PopoverTrigger asChild>
              <Button
                aria-expanded={open}
                className="w-[200px] justify-between"
                role="combobox"
                variant="outline"
              >
                {value
                  ? roles.find((framework) => framework.value === value)?.label
                  : "Выберите роль..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Поиск роли..." />
                <CommandList>
                  <CommandEmpty>Нет такой роли.</CommandEmpty>
                  <CommandGroup>
                    {roles.map((role) => (
                      <CommandItem
                        key={role.value}
                        onSelect={(currentValue: string) => {
                          setValue(currentValue === value ? value : currentValue as Role)
                          setOpen(false)
                        }}
                        value={role.value}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === role.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {role.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={handleSave}
          variant="secondary"
        >Сохранить
        </Button>
      </DialogContent>
    </Dialog>
  )
}
