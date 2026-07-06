import type { Employee } from '../../types';
import './EmployeeCard.css';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <article className="employee-card">
      <img
        src={employee.image}
        alt={`${employee.firstName} ${employee.lastName}`}
        className="employee-card__photo"
        loading="lazy"
      />
      <div className="employee-card__body">
        <h2 className="employee-card__name">
          {employee.firstName} {employee.lastName}
        </h2>
        <dl className="employee-card__details">
          <div className="employee-card__row">
            <dt>Email</dt>
            <dd>{employee.email}</dd>
          </div>
          <div className="employee-card__row">
            <dt>Phone</dt>
            <dd>{employee.phone}</dd>
          </div>
          <div className="employee-card__row">
            <dt>Position</dt>
            <dd>{employee.company.title}</dd>
          </div>
          <div className="employee-card__row">
            <dt>Company</dt>
            <dd>{employee.company.name}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
