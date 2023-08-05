antisoSHELL: main.o prompt.o process.o execute.o builtin.o ls.o functions.o history.o autocomplete.o
	gcc -g main.o prompt.o process.o execute.o builtin.o ls.o functions.o history.o autocomplete.o -o srujshell

main.o: src/main.c src/headers.h src/prompt.h src/process.h
	gcc -g -c src/main.c

prompt.o: src/prompt.c src/prompt.h src/headers.h
	gcc -g -c src/prompt.c

process.o: src/process.c src/process.h src/execute.h src/headers.h
	gcc -g -c src/process.c

execute.o: src/execute.c src/execute.h src/builtin.h src/ls.h src/functions.h src/history.h src/headers.h
	gcc -g -c src/execute.c

builtin.o: src/builtin.c src/builtin.h src/headers.h
	gcc -g -c src/builtin.c

ls.o: src/ls.c src/ls.h src/headers.h
	gcc -g -c src/ls.c

functions.o: src/functions.c src/functions.h src/headers.h
	gcc -g -c src/functions.c

history.o: src/history.c src/history.h src/headers.h
	gcc -g -c src/history.c

autocomplete.o: src/autocomplete.c src/autocomplete.h src/headers.h
	gcc -g -c src/autocomplete.c

clear:
	rm -f *.o antisoSHELL
