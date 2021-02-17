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
    raise Exception('xdxd') 
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

ejemplo = lambda x, y: x+y

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

    if rs[0].lower() == "filtrar":
        filtros_disponibles = [{ "displayString": "ID Issue", "apiCall": lambda x: api_test(issue_id=x), "acceptedTypes": "int, string" },
        { "displayString": "ID Parents", "apiCall": lambda x: api_test(parent_id =x), "acceptedTypes": "int" },]

        f = 0
        
        opcion_salida = len(filtros_disponibles)+1

        while (f+1 != opcion_salida):
            print("")
            i=0
            for x in filtros_disponibles:
                i=i+1
                print(str(i) + " - " + x["displayString"])
        
            print(str(opcion_salida) + " - Cancelar")
            print("")
            f = input("Introduce el numero de filtro que deseas seguido de los parametros: ")

            input_failed = False
            try:
                f = int(f)-1
            except:
                input_failed = True

            if (not input_failed):
                if (f+1 != opcion_salida):
                    if (f >= 0 and f < len(filtros_disponibles)):
                        elem=filtros_disponibles[f]

                        arg=input("Introduzca un ID: ")
                        try:
                            #exec("issues = api_test({})").format("issue_id="+arg)
                            #exec("issues = ")
                            issues = elem["apiCall"](arg)

                            for d in issues:
                                print(d)
                        except:
                            print("\nSe produjo el siguiente error:\n")
                            type, value, traceback = sys.exc_info()
                            print( type, value)
                    else:
                        print("Opcion incorrecta")
            else:
                f = 0
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
    raise Exception('xdxd') 
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

ejemplo = lambda x, y: x+y

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

    if rs[0].lower() == "filtrar":
        filtros_disponibles = [{ "displayString": "ID Issue", "apiCall": lambda x: api_test(issue_id=x), "acceptedTypes": "int, string" },
        { "displayString": "ID Parents", "apiCall": lambda x: api_test(parent_id =x), "acceptedTypes": "int" },]

        f = 0
        
        opcion_salida = len(filtros_disponibles)+1

        while (f+1 != opcion_salida):
            print("")
            i=0
            for x in filtros_disponibles:
                i=i+1
                print(str(i) + " - " + x["displayString"])
        
            print(str(opcion_salida) + " - Cancelar")
            print("")
            f = input("Introduce el numero de filtro que deseas seguido de los parametros: ")

            input_failed = False
            try:
                f = int(f)-1
            except:
                input_failed = True

            if (not input_failed):
                if (f+1 != opcion_salida):
                    if (f >= 0 and f < len(filtros_disponibles)):
                        elem=filtros_disponibles[f]

                        arg=input("Introduzca un ID: ")
                        try:
                            #exec("issues = api_test({})").format("issue_id="+arg)
                            #exec("issues = ")
                            issues = elem["apiCall"](arg)

                            for d in issues:
                                print(d)
                        except:
                            print("\nSe produjo el siguiente error:\n")
                            type, value, traceback = sys.exc_info()
                            print( type, value)
                    else:
                        print("Opcion incorrecta")
            else:
                f = 0


        print("Ha salido del menu filtros")

    # ACTUALIZAR

    # HISTORIAL DE CAMBIOS


    if (r == "salir") or (r == "Salir") or (r == "SALIR") or (r == "sALIR"):

        time.sleep(1)
        
        ctrl = True

        print("Ha salido del menu filtros")

    # ACTUALIZAR

    # HISTORIAL DE CAMBIOS


    if (r == "salir") or (r == "Salir") or (r == "SALIR") or (r == "sALIR"):

        time.sleep(1)
        
        ctrl = True