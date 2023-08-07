# 👷‍♂️Employee-Management📊

## Project Description:

This is a Console Based Menu Driven JDBC Application connected with Oracle Database to perform the following four operation
- ```Add Employee```
- ```Search Employee```
- ```Update Employee```
- ```Delete Employee```

This is a layered application consisting of mainly three different layers

### ```Data Layer```

This layer normally interacts with the database associated with the application.Here the following functions has been done

1) Declare an interface with all abstract methods where each and every abstract methods is representing a particular operation.
2) Provide implementation for interface methods.
3) Provide a factory class and factory methods to send object to previous layer i.e Service Layer

### ```Service Layer```

This layer normally interacts with the DAO Layer.Here the following functions has been performed

1) Declare an interface with abstract methods where each and every abstract methods represent a particular operation,
2) Prepare an implementation class for the interface and its methods
3) Get Data from Controller Layer and get DAO oBject and access Dao Methods
4) Prepare a Factory class and Factory methods to supply object to Controller Layer

### ```Test Layer```

Sincle this is a StandAlone Application so we will have test class for Presentation and Controller Layer i.e void main() in Test Layer.So thhe menu driven program with the main method is written here.

## Application Overview:-

<table>
    <tr>
	<td> ADD EMPLOYEE MODULE </td>
        <td><img src="https://user-images.githubusercontent.com/91726340/235788215-c6dad9b9-cba4-48dd-91a4-7db7f5deb150.png"></td>
        <td><img src="https://user-images.githubusercontent.com/91726340/235788225-b2f0a162-6f48-4583-9b2c-af33fe4d465f.png"></td>
    </tr>
  <tr>
	<td> SEARCH EMPLOYEE MODULE </td>
        <td><img src="https://user-images.githubusercontent.com/91726340/235788659-1758cfe6-9489-4440-b179-ee33dca7b217.png"></td>
        <td><img src="https://user-images.githubusercontent.com/91726340/235788670-f9a11d89-0a07-4a10-9f2c-3cd3508174c7.png"></td>
    </tr>
 <tr>
	<td> UPDATE EMPLOYEE MODULE </td>
        <td><img src="https://user-images.githubusercontent.com/91726340/235788786-9f5ff54e-ca4e-4e93-9248-ee7dd8269086.png"></td>
        <td><img src="https://user-images.githubusercontent.com/91726340/235788802-2f993f48-303e-4d3e-8291-4f62141fc7bb.png"></td>
    </tr>
 <tr>
	<td> DELETE EMPLOYEE MODULE </td>
        <td><img src="https://user-images.githubusercontent.com/91726340/235788921-4ff56866-a4ea-4528-8a6c-07307df15996.png"></td>
        <td><img src="https://user-images.githubusercontent.com/91726340/235788929-e65c8d5c-e9c1-4500-8824-516b5a07242c.png"></td>
    </tr>

</table>


