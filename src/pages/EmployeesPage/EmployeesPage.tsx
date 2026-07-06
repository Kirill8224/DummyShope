import { useEmployees } from '../../hooks/useEmployees';
import { BackButton } from '../../Ui/BackButton/BackButton';
import { EmployeeCard } from '../../Ui/EmployeeCard/EmployeeCard';
import { ErrorMessage } from '../../Ui/ErrorMessage/ErrorMessage';
import { LoadingSpinner } from '../../Ui/LoadingSpinner/LoadingSpinner';
import './EmployeesPage.css';

export function EmployeesPage() {
  const { employees, loading, error } = useEmployees();

  return (
    <div className="employees-page">
      <BackButton label="Back to Home" />
      <header className="employees-page__header">
        <h1 className="employees-page__title">Our Employees</h1>
      </header>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="employees-page__list">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
}
