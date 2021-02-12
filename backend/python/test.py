# Ascentio Technologies
#
#
#
# Dependencias:
import threading
import subprocess as sp
from subprocess import Popen, PIPE
import datetime
# Mas modulos:
import os
import sys
import time

def api_test(**kwargs):
    print("api_test()")
    for a in kwargs:
        print(a, kwargs[a])

# Functions:

print("""
╔════════════════╗
║  Guia de uso:  ║
╚════════════════╝
 1) Para consultar los proyectos existentes escriba 'consultar proyectos 
 2) Para cargar una issue escriba 'cargar peticion' y siga las instrucciones
 3) Para filtrar una issue escriba 'filtrar'y siga las instrucciones

 
  Para salir escriba 'salir'

""")

ctrl = False

while not ctrl:
    r = input()
    rs = r.split( sep = " ")

    # CONSULTAR MOSTRAR PROYECTOS
    if rs[0] == "consultar" or rs[0] == "mostrar" or rs[0] == "CONSULTAR" or  rs[0] == "MOSTRAR":
        print("Mostrar")
    # CARGAR PET7ICION
    
    if rs[0] == "cargar" or rs[0] == "CARGAR":
        if rs[1] == "peticion":
            print("\nIngrese los valores o dejelos en blanco para pasarlos por defecto\n\n")

            id_proyecto = input( "ID del proyecto: ")
            if id_proyecto != "":
                print("ok")
                    

    # FILTRAR

    if rs[0]== "filtrar":
        i=0

        filtros_disponibles = [{ "displayString": "ID Issue", "apiCall": lambda x: api_test(api_id=x), "acceptedTypes": "int, string" },
        { "displayString": "ID Parents", "apiCall": lambda x: api_test(api_id=x), "acceptedTypes": "int" },]

        xd = api_test

        print("Introduce el numero de filtro que deseas seguido de los parametros")
        
        for x in filtros_disponibles:
            i=i+1
            print(str(i) + " - " + x["displayString"])
        
        opcion_salida = i+1 # <--- La opcion de salir sera el ultimo i mostrado + 1
        print(str(opcion_salida) + " - Cancelar")

        fs = [-1]

        while (fs[0]+1 != opcion_salida):
            f = input()
            fs = f.split( sep = " ")
            fs[0] = int(fs[0])-1

            if (fs[0]+1 != opcion_salida):
                if (fs[0] >= 0 and fs[0] < len(filtros_disponibles)):
                    elem = filtros_disponibles[fs[0]]
                    print(elem)
                    arg = input("Introduzca un ID: ")
                    
                    elem["apiCall"](arg)
                else:
                    print("Opcion incorrecta")


        print("Ha salido del menu filtros")

    # ACTUALIZAR

    # HISTORIAL DE CAMBIOS


    if (r == "salir") or (r == "Salir") or (r == "SALIR") or (r == "sALIR"):

        time.sleep(1)
        
        ctrl = True