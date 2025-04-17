"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ReactNode } from "react";

type CustomDrawerProps = {
  triggerLabel: string;
  title: string;
  body: ReactNode;
  footer?: ReactNode;
};

export default function CustomDrawer({
  triggerLabel,
  title,
  body,
  footer,
}: CustomDrawerProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>{triggerLabel}</Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {title}
              </DrawerHeader>
              <DrawerBody>{body}</DrawerBody>
              <DrawerFooter className="flex justify-end gap-2">
                {footer ? (
                  footer
                ) : (
                  <>
                    <Button variant="light" color="danger" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Save
                    </Button>
                  </>
                )}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
