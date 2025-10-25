package EmploeePortal.service;

import java.util.List;

import org.springframework.stereotype.Service;

import EmploeePortal.model.Employee;
import EmploeePortal.repository.EmployeeRepo;


@Service
public class EmployeeService {

	    private EmployeeRepo repo;

	    public EmployeeService(EmployeeRepo repo) {
	        this.repo = repo;
	    }

	    public List<Employee> getAllEmployees() {
	        return repo.findAll();
	    }

	    public Employee getEmployeeById(Long id) {
	        return repo.findById(id).orElse(null);
	    }

	    public Employee saveEmployee(Employee emp) {
	        return repo.save(emp);
	    }

	    public Employee updateEmployee(Long id, Employee empDetails) {
	        Employee emp = repo.findById(id).orElseThrow();
	        emp.setName(empDetails.getName());
	        emp.setEmail(empDetails.getEmail());
	        emp.setDepartment(empDetails.getDepartment());
	        emp.setSalary(empDetails.getSalary());
	        return repo.save(emp);
	    }

	    public void deleteEmployee(Long id) {
	        repo.deleteById(id);
	    }
	}



